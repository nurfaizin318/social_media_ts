import {z, ZodType} from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(50),
        firstname: z.string().min(2).max(50),
        lastname : z.string().min(2).max(50)
    });

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly UPDATE: ZodType = z.object({
        password: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional()
    });

    static readonly SENDOTP: ZodType = z.object({
        email: z.string().min(1).max(100),
    });

    static readonly VERIFYOTP: ZodType = z.object({
        code: z.string().min(4).max(4),
        email: z.string().min(1).max(100),
    });



}
