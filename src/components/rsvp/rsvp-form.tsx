"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { InvitationVariant } from "@/config/invitation-variants";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { rsvpSchema } from "@/lib/validation/rsvp";
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
  const reduceMotion = useReducedMotion();

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
    <LazyMotion features={domAnimation} strict>
      <section className="invitation-section rsvp-section" aria-labelledby="rsvp-heading" id="rsvp">
        <PetalField />
        <Image className="rsvp-floral left" src="/assets/rsvp/watercolor-floral-spray.png" alt="" width={312} height={400} data-flower-layer="far" />
        <Image className="rsvp-floral right" src="/assets/rsvp/watercolor-floral-spray.png" alt="" width={312} height={400} data-flower-layer="near" />
        <m.h2
          id="rsvp-heading"
          className="script-heading"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          RSVP
        </m.h2>
        <div className="paper-card" data-rsvp-card>
          <Image className="paper-clip" src="/assets/rsvp/paper-clip.png" alt="" width={100} height={86} />
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <m.div
                key="success"
                className="success-state"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
              >
                <span className="success-mark" aria-hidden="true">✓</span>
                <h3>Terima kasih</h3>
                <p>Konfirmasi Anda telah kami terima. Sampai berjumpa di hari bahagia kami.</p>
              </m.div>
            ) : (
              <m.form key="form" onSubmit={handleSubmit} noValidate initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                {error && <p className="form-error" role="alert">{error}</p>}
                <m.button
                  className="invitation-button"
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={reduceMotion ? undefined : { scale: 1.025 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  {status === "submitting" ? "Mengirim…" : "Kirim Konfirmasi"}
                </m.button>
              </m.form>
            )}
          </AnimatePresence>
        </div>
        
        {/* Guest Messages - Right under the RSVP form */}
        <GuestMessagesSection />
      </section>
    </LazyMotion>
  );
}
