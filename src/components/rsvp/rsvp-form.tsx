"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { InvitationVariant } from "@/config/invitation-variants";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { rsvpSchema } from "@/lib/validation/rsvp";
import { playSoftTransition } from "@/lib/animation/transitions";
import { GuestMessagesSection } from "../invitation/guest-messages-section";
import { PetalField } from "../invitation/decorations";

interface RsvpFormProps {
  variant: InvitationVariant;
  guestName: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function RsvpForm({ variant, guestName }: RsvpFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") playSoftTransition(successRef.current);
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || status === "success") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const attendanceStatus = formData.get("attendanceStatus");
    const parsed = rsvpSchema.safeParse({
      guestName: formData.get("guestName"),
      attendanceStatus,
      attendeeCount: attendanceStatus === "attending" ? formData.get("attendeeCount") : null,
      message: formData.get("message") ?? "",
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Periksa kembali data Anda.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: insertError } = await supabase.from("rsvps").insert({
        guest_name: parsed.data.guestName,
        attendance_status: parsed.data.attendanceStatus,
        attendee_count: parsed.data.attendeeCount,
        message: parsed.data.message || null,
        guest_type: variant.guestType,
        invitation_path: variant.invitationPath,
        event_time: variant.eventTime,
      });

      if (insertError) throw insertError;
      setStatus("success");
      window.dispatchEvent(new Event("rsvp:submitted"));
    } catch {
      setError("Konfirmasi belum dapat dikirim. Silakan coba beberapa saat lagi.");
      setStatus("error");
    }
  }

  return (
    <section className="invitation-section rsvp-section" aria-labelledby="rsvp-heading" id="rsvp" data-reveal="section">
      <PetalField />
      <Image className="rsvp-floral left" src="/assets/rsvp/watercolor-floral-spray.png" alt="" width={312} height={400} data-flower-layer="far" />
      <Image className="rsvp-floral right" src="/assets/rsvp/watercolor-floral-spray.png" alt="" width={312} height={400} data-flower-layer="near" />
      <h2 id="rsvp-heading" className="script-heading" data-reveal-item>
        RSVP
      </h2>
      <div className="paper-card" data-reveal-item>
        <Image className="paper-clip" src="/assets/rsvp/paper-clip.png" alt="" width={100} height={86} />
        {status === "success" ? (
          <div ref={successRef} className="success-state" role="status" aria-live="polite">
            <span className="success-mark" aria-hidden="true">✓</span>
            <h3>Terima kasih</h3>
            <p>Konfirmasi Anda telah kami terima. Sampai berjumpa di hari bahagia kami.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="guestName">Nama</label>
              <input id="guestName" name="guestName" type="text" autoComplete="name" required maxLength={100} defaultValue={guestName} />
            </div>
            <div className="field">
              <label htmlFor="attendanceStatus">Konfirmasi Kehadiran</label>
              <select id="attendanceStatus" name="attendanceStatus" required defaultValue="">
                <option value="" disabled>Pilih konfirmasi</option>
                <option value="attending">Hadir</option>
                <option value="not_attending">Tidak hadir</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="attendeeCount">Jumlah Tamu</label>
              <select id="attendeeCount" name="attendeeCount" defaultValue="1">
                {[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count} orang</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Ucapan / Doa</label>
              <textarea id="message" name="message" rows={5} maxLength={1000} />
            </div>
            {status === "submitting" && <p className="form-loading" role="status">Mengirim konfirmasi…</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button
              className="invitation-button"
              type="submit"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? "Mengirim…" : "Kirim Konfirmasi"}
            </button>
          </form>
        )}
      </div>

      {/* Guest Messages - Right under the RSVP form */}
      <GuestMessagesSection />
    </section>
  );
}
