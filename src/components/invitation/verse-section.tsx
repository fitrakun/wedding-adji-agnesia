import Image from "next/image";
import { PetalField } from "./decorations";

export function VerseSection() {
  return <section className="invitation-section verse-section" aria-labelledby="verse-title">
    <PetalField />
    <Image className="verse-flower top" src="/assets/verse/top-right-flower.png" alt="" width={202} height={228} data-flower-layer="near" />
    <Image className="verse-flower bottom" src="/assets/verse/bottom-left-flower.png" alt="" width={241} height={200} data-flower-layer="far" />
    <article className="verse-card" data-reveal-item>
      <h2 id="verse-title" className="sr-only">Surat Ar-Rum ayat 21</h2>
      <p className="arabic" lang="ar" dir="rtl">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ</p>
      <blockquote>Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</blockquote>
      <cite>Qs Ar-rum 21</cite>
    </article>
  </section>;
}
