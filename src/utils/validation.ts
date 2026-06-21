import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z.string().trim().min(2, "validation.required").max(120),
  phone: z
    .string()
    .trim()
    .min(5, "validation.phone")
    .max(32)
    .regex(/^[+0-9 ()\-]+$/, "validation.phone"),
  email: z.string().trim().email("validation.email").max(254),
  guests: z.coerce.number().int().min(1, "validation.guests").max(12, "validation.guests"),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "validation.required").max(120),
  email: z.string().trim().email("validation.email").max(254),
  message: z.string().trim().min(2, "validation.required").max(2000),
});
