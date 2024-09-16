import {z, ZodType} from "zod";

export class PostValidation {

    static fileSchema = z.object({
        originalname: z.string(),
        mimetype: z.enum(['image/jpeg', 'image/png', 'image/gif']).refine((mime) => mime, {
          message: "Invalid file type. Only jpg, png, gif are allowed.",
        }),
        size: z.number().max(5000000, "File size should not exceed 5MB"), // max 5MB
      }).optional();

    static readonly UPLOAD: ZodType = z.object({
        user_id: z.string().min(1).max(100),
        content: z.string().min(1).max(200),
        media_url: z.string().max(200).optional()
    });

    static readonly UPDATE: ZodType = z.object({
      id: z.string().min(1).max(100),
      user_id: z.string().min(1).max(100),
      content: z.string().min(1).max(200),
      media_url: z.string().max(200).optional()
  });



}
