import Image from "next/image";
import { PetalField } from "./decorations";

export function ClosingSection() {
  return <section className="invitation-section closing-section" aria-labelledby="closing-title" data-reveal="section">
    <PetalField />
    <Image className="closing-section-background" src="/assets/footer/section-background.png" alt="" width={3110} height={3212} priority={false} />
    <div className="section-content closing-content">
      <div className="closing-content-wrapper">
        <p data-reveal-item>Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.<br />Wassalamu&apos;alaikum warahmatullahi wabarakatuh.</p>
        <Image src="/assets/footer/couple-gold-framed.png" alt="Ilustrasi Agnesia dan Adji dalam bingkai emas" width={560} height={640} data-reveal-item />
        <h2 id="closing-title" className="font-daydream couple-title"><span>Agnesia</span><span>&amp;</span><span>Adji</span></h2>
      </div>
    </div>
    <Image className="footer-background" src="/assets/footer/footer-background.png" alt="" width={1080} height={260} />
    <footer className="closing-credit font-open-sans">Made with <span aria-label="cinta">♥</span> by Fitra, Anaz, Rafi</footer>
  </section>;
}
