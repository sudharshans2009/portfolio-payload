import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message_content: z.string().min(10).max(500),
  ip: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
