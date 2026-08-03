import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const daydream = localFont({ src: "../../public/fonts/daydream.woff2", variable: "--font-daydream", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap", style: ["normal", "italic"], weight: ["300", "400", "500", "600", "700", "800"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display", display: "swap", style: ["normal", "italic"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Syukuran Pernikahan Agnesia & Adji",
  description: "Undangan syukuran pernikahan Agnesia Puspitasari dan Ibrahim Adji, Sabtu 22 Agustus 2026.",
  openGraph: { title: "Agnesia & Adji — Syukuran Pernikahan", description: "Sabtu, 22 Agustus 2026 — Lumé Coffee Lounge, Tebet.", type: "website" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fff6ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${daydream.variable} ${openSans.variable} ${playfairDisplay.variable}`}><body>{children}</body></html>;
}
