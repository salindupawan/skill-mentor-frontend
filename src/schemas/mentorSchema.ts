import { z } from "zod"

export const mentorSchema = z.object({

  firstName: z
    .string()
    .min(2,"First name required"),

  lastName: z
    .string()
    .min(2,"Last name required"),

  email: z
    .string()
    .email("Invalid email"),

  phone: z.string().optional(),

  title: z.string().optional(),

  profession: z.string().optional(),

  company: z.string().optional(),

  experience: z
    .string()
    .optional(),

  bio: z
    .string()
    .max(500)
    .optional(),

  startYear: z
    .string()
    .optional(),

  certified: z.boolean().optional()

})