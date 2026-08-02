import { z } from "zod";

export const rsvpSchema = z.object({
  guestName: z.string().trim().min(2, "Nama minimal 2 karakter.").max(100),
  attendanceStatus: z.enum(["attending", "not_attending"], {
    message: "Pilih konfirmasi kehadiran.",
  }),
  attendeeCount: z.coerce.number().int().min(1).max(5).nullable(),
  message: z.string().trim().max(1000, "Ucapan maksimal 1000 karakter."),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
