


import { z, ZodType } from "zod";


export class RideValidation {

    static readonly RIDETYPE: ZodType = z.object({
        location: z.string().min(1).max(80),
        destination: z.string().min(1).max(80),
    });


    static readonly ORDER: ZodType = z.object({
        from: z.string().min(1).max(100),
        destination: z.string().min(1).max(100),
        distance: z.number().min(1).max(10000),
        driver_id: z.number().min(1).max(10000),
        user_id: z.number().min(1).max(10000),
        rideType_id: z.number().min(1).max(10000),
       
    });
}


