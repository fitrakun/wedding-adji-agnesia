import Image from "next/image";
import { PetalField } from "./decorations";

const photos = Array.from({ length: 10 }, (_, index) => `/assets/gallery/gallery-photo-${String(index + 1).padStart(2, "0")}.jpg`);
const columns = [[0, 3, 6], [1, 4, 7, 9], [2, 5, 8]];

export function GallerySection() {
  return <section className="invitation-section gallery-section" aria-labelledby="gallery-heading">
    <PetalField />
    <Image className="gallery-flower left" src="/assets/gallery/blue-pink-floral-spray.png" alt="" width={206} height={400} data-flower-layer="far" />
    <Image className="gallery-flower right" src="/assets/gallery/blue-pink-floral-spray.png" alt="" width={206} height={400} data-flower-layer="near" />
    <Image className="gallery-camera" src="/assets/gallery/instant-camera-ornament.png" alt="" width={185} height={200} />
    <h2 id="gallery-heading">Photo Gallery</h2>
    <div className="gallery-grid">
      {columns.map((indexes, columnIndex) => <div className="gallery-column" key={columnIndex}>
        {indexes.map((photoIndex) => <figure key={photos[photoIndex]} data-gallery-item>
          <Image src={photos[photoIndex]} alt={`Foto kebersamaan Agnesia dan Adji ${photoIndex + 1}`} width={303} height={455} sizes="(max-width: 430px) 31vw, 132px" />
        </figure>)}
      </div>)}
    </div>
  </section>;
}
