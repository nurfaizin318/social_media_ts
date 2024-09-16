import { z, ZodType } from "zod";

export class MessageValidation {


  static readonly STORE: ZodType = z.object({
    from_id: z.number().min(1).max(100),
    to_Id: z.number().min(1).max(100),
    content: z.string().min(1).max(100)

  });


  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).max(100),
    content: z.string().min(1).max(100)

  });

  static readonly DETAIL: ZodType = z.object({
    from_id: z.number().min(1).max(100),
    to_Id: z.number().min(1).max(100),

  });

}
