import { z } from "zod";

export const formSchema = z
  .object({
    title: z.string().min(1, "Online Test Title is required"),
    candidates: z
      .string()
      .min(1, "Total candidates is required")
      .regex(/^\d+$/, "Must be a number"),
    slots: z.string().min(1, "Total slots is required"),
    questionSet: z.string().min(1, "Question set is required"),
    questionType: z.string().min(1, "Question type is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be greater than start time",
    path: ["endTime"],
  });
  
export type FormData = z.infer<typeof formSchema>;


