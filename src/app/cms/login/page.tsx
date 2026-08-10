import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";
import "../cms.css";

export const metadata = { title: "Masuk — CMS Agnesia & Adji" };

export default function LoginPage() {
  return (
    <main className="cms-page">
      <div className="cms-card">
        <Image
          className="cms-floral-corner top-left"
          src="/assets/rsvp/watercolor-floral-spray.png"
          alt=""
          width={130}
          height={170}
        />
        <Image
          className="cms-floral-corner bottom-right"
          src="/assets/rsvp/watercolor-floral-spray.png"
          alt=""
          width={130}
          height={170}
        />
        <div className="cms-card-inner">
          <h1 className="cms-monogram">
            A<span className="cms-ampersand">&amp;</span>A
          </h1>
          <p className="cms-subtitle">Daftar Tamu Pribadi</p>
          <LoginForm />
          <Link className="cms-back-link" href="/">← Kembali ke undangan</Link>
        </div>
      </div>
    </main>
  );
}
