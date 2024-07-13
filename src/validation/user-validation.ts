import {z, ZodType} from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        phone_number: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly LOGIN: ZodType = z.object({
        prefix: z.string().min(1).max(10),
        phone_number: z.string().min(1).max(100),
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
