import { z } from "zod";

export const SubjectSchema = z.object({
  name: z.string().min(3, "Subject name must be at least 3 characters"),
  description: z.string().min(10, "Description should be more detailed"),
  mentorId: z.string().min(1, "Mentor selection is required"),
  image: z.instanceof(File, { message: "Please upload a subject cover image" })
});

export type SubjectFormData = z.infer<typeof SubjectSchema>;