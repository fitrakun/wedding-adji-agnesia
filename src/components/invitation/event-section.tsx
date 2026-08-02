import Image from "next/image";
import type { InvitationVariant } from "@/config/invitation-variants";
import { PetalField } from "./decorations";
import { EventCountdown } from "./event-countdown";

export function EventSection({ variant }: { variant: InvitationVariant }) {
  return <section className="invitation-section event-section" aria-labelledby="event-heading">
    <PetalField />
    <div className="event-envelope" data-reveal-item>
      <Image src="/assets/event/envelope-card.png" alt="" width={182} height={200} className="envelope-art" />
      <Image src="/assets/event/pink-rose.png" alt="" width={200} height={190} className="envelope-rose" data-flower-layer="near" />
      <Image src="/assets/event/pink-flower-cluster.png" alt="" width={192} height={200} className="envelope-flowers" data-flower-layer="far" />
      <div className="event-copy">
        <h2 id="event-heading" className="font-daydream">Syukuran Pernikahan</h2>
        <p className="event-date" data-opening-date>Sabtu, 22 Agustus 2026</p>
        <p className="event-time">{variant.eventTimeWithZone}</p>
        <h3>Lumé Coffee Lounge, Lt. 2</h3>
        <p>Jl. KH Abdullah Syafei No. 7,<br />Tebet, Jakarta Selatan</p>
      </div>
    </div>
    <h2 className="font-daydream save-date">Save The Date</h2>
    <EventCountdown target={variant.eventStartsAt} />
    <div className="map-panel">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.305618351886!2d106.84691847681695!3d-6.223373293764731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3a817308db5%3A0x88eb1a101759fc5a!2sLum%C3%A9%20Coffee!5e0!3m2!1sen!2sid!4v1785680407086!5m2!1sen!2sid" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }}></iframe>
      <a className="canva-button" href="https://maps.app.goo.gl/1RJhaTicaDJiB8fa7" target="_blank" rel="noreferrer">Buka Google Maps</a>
    </div>
  </section>;
}
