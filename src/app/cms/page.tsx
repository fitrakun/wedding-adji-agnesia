import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Rsvp } from "@/config/rsvp";
import { DashboardClient } from "./dashboard-client";
import "./cms.css";

export const metadata = { title: "Daftar Tamu — CMS Agnesia & Adji" };
export const dynamic = "force-dynamic";

export default async function CmsDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/cms/login");

  const { data } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  const rsvps: Rsvp[] = data ?? [];
  const email = user.email ?? "";
  const initials = email.slice(0, 1).toUpperCase() || "A";

  return <DashboardClient rsvps={rsvps} email={email} initials={initials} />;
}
