import {z, ZodType} from "zod";

export class FriendShipvalidation {


    static readonly STORE: ZodType = z.object({
      from_id: z.number().min(1).max(100),
      to_id: z.number().min(1).max(100),
 
  });



}
