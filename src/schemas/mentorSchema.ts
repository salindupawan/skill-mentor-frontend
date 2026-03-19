import z from "zod";

export const mentorSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  title: z.string().min(2, "Title is required (e.g. Mr, Dr)"),
  profession: z.string().min(2, "Profession is required"),
  company: z.string().min(2, "Company name is required"),
  experienceYears: z.coerce.number({ error: "Must be a number" }).min(0),
  startYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  isCertified: z.boolean().default(false),
  specializations: z.string().min(2, "At least one specialization is required"),
});

// 2. Derive Type from Schema
export type CreateMentorForm = z.infer<typeof mentorSchema>;