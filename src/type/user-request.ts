import {Request} from "express";
import {User} from "@prisma/client";
import { ZodError, ZodErrorMap, ZodIssue } from "zod";


export interface UserRequest extends Request {
    user?: User
}


export interface FormatedResponse {
        code: number;
        success: Boolean;
        data: any;

}


export function formatedSuccessResponse(ctx: any): FormatedResponse {
    return {
        code: 200,
        success: true,
        data: ctx
    }
}

