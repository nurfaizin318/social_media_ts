import {z, ZodType} from "zod";

export class CommentValidation {


    static readonly STORE: ZodType = z.object({
      post_id: z.number().min(1).max(100),
      user_id: z.number().min(1).max(100),
      content: z.string().min(1).max(100)
 
  });

  
  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).max(100),
    post_id: z.number().min(1).max(100),
    user_id: z.number().min(1).max(100),
    content: z.string().min(1).max(100)

});




}
