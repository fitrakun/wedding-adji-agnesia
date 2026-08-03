import Image from "next/image";
import { PetalField } from "./decorations";

const people = [
  { name: "Agnesia Puspitasari", parents: "Anak dari alm. Atmajaya & Ibu Manar", image: "/assets/couple/bride-portrait-framed.png", alt: "Ilustrasi Agnesia Puspitasari" },
  { name: "Ibrahim Adji", parents: "Anak dari Bapak Adji Baroto & Ibu Sofrida", image: "/assets/couple/groom-portrait-framed.png", alt: "Ilustrasi Ibrahim Adji" },
];

export function CoupleSection() {
  return <section className="invitation-section couple-section" aria-labelledby="couple-heading" data-reveal="section">
    <PetalField />
    <Image className="couple-floral coral" src="/assets/couple/coral-floral-corner.png" alt="" width={200} height={200} data-flower-layer="far" />
    <Image className="couple-floral navy" src="/assets/couple/navy-floral-corner.png" alt="" width={200} height={193} data-flower-layer="near" />
    <div className="section-content couple-content">
      <Image className="salam" src="/assets/couple/assalamualaikum.png" alt="السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ" width={624} height={118} data-reveal="fade" />
      <p id="couple-heading" data-reveal-item>Dengan memohon rahmat dan ridho Allah SWT,<br />kami bermaksud untuk melaksanakan pernikahan<br />putra-putri kami:</p>
      <div className="people-stack">
        {people.map((person) => <article className="person-card" key={person.name} data-reveal-item>
          <div>
            <Image src={person.image} alt={person.alt} width={380} height={440} />
          </div>
          <h2>{person.name}</h2>
          <p>{person.parents}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
