
import {z, ZodType} from "zod";


export class MapValidation {

    static readonly POLYLINE: ZodType = z.object({
        location: z.string().min(1).max(80),
        destination: z.string().min(1).max(80),
    
    });

    static readonly PLACE: ZodType = z.object({
        place: z.string().min(1).max(100),
     
    });


    
}
