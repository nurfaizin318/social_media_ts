import {Response, Request, NextFunction} from "express";
import {ZodError, ZodIssue} from "zod";
import {ResponseError} from "../error/response-error";



export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {

        if (error instanceof ZodError) {
        
            res.status(400).json({
                status: 1000,
                success: false,
                errors: error.errors.map(e => ({
                    path: e.path,
                    message: e.message
                }))
            });
        } else if (error instanceof ResponseError) {
        res.status(error.status).json({
            status:400,
            success : false, 
            errors: error.message
        });
    } else {
        res.status(500).json({
            errors: error
        });
    }
}
