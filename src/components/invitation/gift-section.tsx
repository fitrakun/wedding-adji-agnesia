"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { playSoftTransition } from "@/lib/animation/transitions";
import { PetalField } from "./decorations";

export function GiftSection() {
  const [showAccount, setShowAccount] = useState(false);
  const [copied, setCopied] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAccount) playSoftTransition(accountRef.current);
  }, [showAccount]);

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText("2300990528");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        {showAccount && <div ref={accountRef} className="account-card-container">
          <div className="ripped-paper-background">
            <span>Rekening <b>BCA</b> a.n. <strong>IBRAHIM ADJI</strong></span>
            <div className="account-number-row">
              <b>2300990528</b>
              <button type="button" onClick={copyAccount} aria-label="Salin nomor rekening" title={copied ? "Copied!" : "Copy"}>
                <Image src="/assets/gift/copy-icon.png" alt="" width={24} height={28} style={{ width: "auto", height: "auto" }} />
              </button>
              {copied && <span className="copy-tooltip">Copied!</span>}
            </div>
          </div>
        </div>}
      </div>
    </div>
  </section>;
}
