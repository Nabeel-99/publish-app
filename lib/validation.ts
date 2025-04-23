import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(1000),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine((url) => {
      // Regex to check if URL ends with an image extension
      const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
      return imageRegex.test(url);
    }),
  pitch: z.string().min(20),
});
