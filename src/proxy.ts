import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIX = "/cms";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLogin = pathname === `${PROTECTED_PREFIX}/login`;
  const isProtected = pathname.startsWith(PROTECTED_PREFIX) && !isLogin;

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `${PROTECTED_PREFIX}/login`;
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  if (isLogin && user) {
    const cmsUrl = request.nextUrl.clone();
    cmsUrl.pathname = PROTECTED_PREFIX;
    cmsUrl.search = "";
    return NextResponse.redirect(cmsUrl);
  }

  return response;
}

export const config = {
  matcher: ["/cms/:path*"],
};
