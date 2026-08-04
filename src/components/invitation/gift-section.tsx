"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { playSoftTransition } from "@/lib/animation/transitions";
import { PetalField } from "./decorations";

const accounts = [
  { bank: "BCA", name: "AGNESTA PUSPITASARI", number: "1640394940" },
  { bank: "BCA", name: "IBRAHIM ADJI", number: "2300990528" },
] as const;

export function GiftSection() {
  const [showAccount, setShowAccount] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAccount) playSoftTransition(containerRef.current);
  }, [showAccount]);

  async function copyAccount(number: string, index: number) {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  return <section className="invitation-section gift-section" aria-labelledby="gift-heading" data-reveal="section">
    <PetalField />
    <div className="gift-panel-wrapper" data-reveal-item>
      <Image src="/assets/gift/blue-paper.png" alt="" fill priority sizes="(max-width: 430px) 80vw, 344px" />
      <div className="gift-panel-content">
        <h2 id="gift-heading" className="font-daydream">Wedding Gift</h2>
        <p>Bapak/Ibu/Saudara/i sekalian dapat memberikan hadiah digital kepada kami melalui nomor rekening berikut.</p>
        <p>Bagi yang telah mengisi dan memberikan hadiah kepada kami, kami mengucapkan banyak terima kasih. Semoga hadiah dari Bapak/Ibu/Saudara/i dapat bermanfaat bagi kami dalam mengarungi bahtera rumah tangga.</p>
        <button className="canva-button" type="button" onClick={() => setShowAccount(v => !v)} aria-expanded={showAccount}>{showAccount ? "Sembunyikan Rekening" : "Lihat Nomor Rekening"}</button>
        {showAccount && <div ref={containerRef} className="account-cards-wrapper">
          {accounts.map((account, index) => (
            <div key={account.number} className="account-card-container">
              <div className="ripped-paper-background">
                <span>Rekening <b>{account.bank}</b> a.n. <strong>{account.name}</strong></span>
                <div className="account-number-row">
                  <b>{account.number}</b>
                  <button type="button" onClick={() => copyAccount(account.number, index)} aria-label="Salin nomor rekening" title={copiedIndex === index ? "Copied!" : "Copy"}>
                    <Image src="/assets/gift/copy-icon.png" alt="" width={24} height={28} style={{ width: "auto", height: "auto" }} />
                  </button>
                  {copiedIndex === index && <span className="copy-tooltip">Copied!</span>}
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  </section>;
}
