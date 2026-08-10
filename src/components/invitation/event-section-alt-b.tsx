import Image from "next/image";
import type { InvitationVariant } from "@/config/invitation-variants";
import { PetalField } from "./decorations";
import { EventCountdown } from "./event-countdown";

/**
 * Design B — "Calendar Hero"
 * The date is the visual anchor as a large calendar-style hero block.
 * Time and location are feature tiles below it.
 * "Save the Date" is a small subtitle under the title.
 * The countdown is a slim horizontal accent bar at the very bottom.
 */
export function EventSectionAltB({ variant }: { variant: InvitationVariant }) {
  return <section className="invitation-section event-section-alt-b" aria-labelledby="event-alt-b-heading" data-reveal="section">
    <PetalField />
    <Image className="event-alt-floral top-right" src="/assets/event/pink-rose.png" alt="" width={200} height={190} data-flower-layer="far" />
    <Image className="event-alt-floral bottom-left" src="/assets/event/pink-flower-cluster.png" alt="" width={192} height={200} data-flower-layer="near" />
    <div className="event-alt-b-content">
      <p className="event-alt-b-label" data-reveal-item>Save the Date</p>
      <h2 id="event-alt-b-heading" className="font-daydream event-alt-b-title" data-reveal-item>Syukuran Pernikahan</h2>

      <div className="event-alt-b-calendar" data-reveal-item>
        <span className="event-alt-b-calendar-day">22</span>
        <span className="event-alt-b-calendar-month">Agustus</span>
        <span className="event-alt-b-calendar-year">2026</span>
      </div>

      <div className="event-alt-b-features">
        <div className="event-alt-b-feature" data-reveal-item>
          <h3 className="event-alt-b-feature-title">Waktu</h3>
          <p className="event-alt-b-feature-value" data-opening-date>Sabtu, 22 Agustus 2026</p>
          <p className="event-alt-b-feature-value">{variant.eventTimeWithZone}</p>
        </div>
        <div className="event-alt-b-feature" data-reveal-item>
          <h3 className="event-alt-b-feature-title">Tempat</h3>
          <p className="event-alt-b-feature-value">Lumé Coffee Lounge, Lt. 2</p>
          <p className="event-alt-b-feature-value">Jl. KH Abdullah Syafei No. 7,<br />Tebet, Jakarta Selatan</p>
        </div>
      </div>

      <EventCountdown target={variant.eventStartsAt} />

      <div className="event-alt-b-map" data-reveal-item>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.305618351886!2d106.84691847681695!3d-6.223373293764731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3a817308db5%3A0x88eb1a101759fc5a!2sLum%C3%A9%20Coffee!5e0!3m2!1sen!2sid!4v1785680407086!5m2!1sen!2sid" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }}></iframe>
        <a className="canva-button" href="https://maps.app.goo.gl/1RJhaTicaDJiB8fa7" target="_blank" rel="noreferrer">Buka Google Maps</a>
      </div>
    </div>
  </section>;
}
