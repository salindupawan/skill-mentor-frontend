import { z } from "zod";

/**
 * Schema for creating a new Subject.
 * It validates the text inputs and ensures a mentor is selected.
 */
export const subjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Subject name must be at least 3 characters." })
    .max(50, { message: "Subject name must be less than 50 characters." }),
  
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500, { message: "Description must be less than 500 characters." }),
  
  mentorId: z
    .string({
      error: "Please select a mentor.",
    })
    .min(1, { message: "Please select a mentor." }),
});

// Export the type to be used in your components
export type SubjectSchema = z.infer<typeof subjectSchema>;