import Image from "next/image";
import { CornerBouquets, PetalField } from "./decorations";
import { OpenInvitationButton } from "./open-invitation-button";

export function OpeningSection({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  return <section className="invitation-section opening-section" aria-labelledby="opening-title" data-animation="opening">
    <CornerBouquets />
    <div className="section-content opening-content">
      <p data-opening-item>Syukuran Pernikahan</p>
      <Image data-opening-portrait src="/assets/opening/couple-portrait-framed.png" alt="Ilustrasi Agnesia dan Adji dalam bingkai bunga mawar" width={360} height={420} priority />
      <h1 id="opening-title" className="font-daydream couple-title" data-opening-title data-opening-item><span>Agnesia</span><span>&amp;</span><span>Adji</span></h1>
      <p data-opening-item>Kepada Yth.<br />Bapak/Ibu/Saudara/i</p>
      <strong className="guest-name" data-guest-name data-opening-item>{guestName}</strong>
      <OpenInvitationButton onOpen={onOpen} />
    </div>
  </section>;
}

export function WelcomeSection() {
  return <section className="invitation-section welcome-section" aria-labelledby="welcome-title" data-reveal="section">
    <CornerBouquets compact />
    <PetalField />
    <div className="section-content welcome-content">
      <p data-reveal-item>Dengan penuh syukur, kami mengundang Anda ke<br />syukuran pernikahan</p>
      <Image src="/assets/opening/couple-portrait-framed.png" alt="Ilustrasi kedua mempelai" width={360} height={420} data-reveal-item />
      <h2 id="welcome-title" className="font-daydream couple-title" data-reveal-item><span>Agnesia</span><span>&amp;</span><span>Adji</span></h2>
    </div>
  </section>;
}
