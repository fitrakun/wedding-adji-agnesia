import Image from "next/image";
import type { InvitationVariant } from "@/config/invitation-variants";
import { PetalField } from "./decorations";
import { EventCountdown } from "./event-countdown";

/**
 * Design A — "Hero Card"
 * The date, time, and venue are the hero of the section inside a large card.
 * "Save the Date" is reduced to a small uppercase label above the date.
 * The countdown sits below as a compact supporting element.
 */
export function EventSectionAltA({ variant }: { variant: InvitationVariant }) {
  return <section className="invitation-section event-section-alt-a" aria-labelledby="event-alt-a-heading" data-reveal="section">
    <PetalField />
    <Image className="event-alt-floral top-left" src="/assets/event/pink-flower-cluster.png" alt="" width={192} height={200} data-flower-layer="far" />
    <Image className="event-alt-floral bottom-right" src="/assets/event/pink-rose.png" alt="" width={200} height={190} data-flower-layer="near" />
    <div className="event-alt-a-content">
      <p className="event-alt-a-label" data-reveal-item>Save the Date</p>
      <div className="event-alt-a-card" data-reveal-item>
        <h2 id="event-alt-a-heading" className="font-daydream event-alt-a-title">Syukuran Pernikahan</h2>
        <p className="event-alt-a-date" data-opening-date>Sabtu, 22 Agustus 2026</p>
        <p className="event-alt-a-time">{variant.eventTimeWithZone}</p>
        <div className="event-alt-a-divider" aria-hidden="true" />
        <h3 className="event-alt-a-venue">Lumé Coffee Lounge, Lt. 2</h3>
        <p className="event-alt-a-address">Jl. KH Abdullah Syafei No. 7,<br />Tebet, Jakarta Selatan</p>
      </div>
      <EventCountdown target={variant.eventStartsAt} />
      <div className="event-alt-a-map" data-reveal-item>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.305618351886!2d106.84691847681695!3d-6.223373293764731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3a817308db5%3A0x88eb1a101759fc5a!2sLum%C3%A9%20Coffee!5e0!3m2!1sen!2sid!4v1785680407086!5m2!1sen!2sid" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }}></iframe>
        <a className="canva-button" href="https://maps.app.goo.gl/1RJhaTicaDJiB8fa7" target="_blank" rel="noreferrer">Buka Google Maps</a>
      </div>
    </div>
  </section>;
}
