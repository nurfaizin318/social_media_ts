import { NextFunction, Response, Request } from "express";
import { ResponseError } from "../error/response-error";
import { formatedSuccessResponse, FormatedResponse } from "../type/user-request";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { LikeRequest } from "../model/like-model";
import { LikeValidation } from "../validation/like-validation";
import { CommentRequest, CommentRequestUpdate } from "../model/comment-model";
import { CommentValidation } from "../validation/comment-validation";





export class CommentService {


    static async index(request: Request): Promise<FormatedResponse> {
        // Validasi inputv\
        try {

            const data = await prismaClient.comment.findMany({
                where : {post_id : Number(request.params.id)},
                select :{
                    user : {
                        select : {
                            firstname : true,
                            lastname : true,
                            id : true,
                            Comment : true
                        }
                    }
                }
            })

            return formatedSuccessResponse(data);
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }


    static async store(request: CommentRequest): Promise<FormatedResponse> {
        // Validasi inputv\

        const validated = Validation.validate(CommentValidation.STORE, request);

        try {

            const data = await prismaClient.comment.create({
                data: validated
            })

            return formatedSuccessResponse("success add comment");
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }

    
    static async update(request: CommentRequestUpdate): Promise<FormatedResponse> {
        // Validasi inputv\

        const validated = Validation.validate(CommentValidation.UPDATE, request);

        try {

            const data = await prismaClient.comment.update({
                where : { id :  request.id },
                data : validated
            })

            return formatedSuccessResponse("success add comment");
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }



    static async destroy(request: Request) {

        try {
            const post = await prismaClient.comment.deleteMany({
                where: { id : Number(request.params.id) }
            });

          
            return formatedSuccessResponse("comment deleted successfully");
        } catch (error) {
            throw new ResponseError(404, error as any);
        }

        // Format dan kirim respons

    }
}
