import {z, ZodType} from "zod";

export class LikeValidation {


    static readonly STORE: ZodType = z.object({
      post_id: z.number().min(1).max(100),
      user_id: z.number().min(1).max(100),
 
  });



}
