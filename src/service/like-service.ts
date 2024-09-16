import { NextFunction, Response, Request } from "express";
import { ResponseError } from "../error/response-error";
import { formatedSuccessResponse, FormatedResponse } from "../type/user-request";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { LikeRequest } from "../model/like-model";
import { LikeValidation } from "../validation/like-validation";





export class LikeService {


    static async index(request: Request, response: Response, next: NextFunction): Promise<FormatedResponse> {
        // Validasi inputv\

        try {

            const data = await prismaClient.like.findMany({
                where : {post_id : Number(request.params.id)},
                select :{
                    user : {
                        select : {
                            firstname : true,
                            lastname : true,
                            id : true
                        }
                    }
                }
            })

            return formatedSuccessResponse(data);
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }


    static async store(request: LikeRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {
        // Validasi inputv\

        const validated = Validation.validate(LikeValidation.STORE, request);



        try {

            const data = await prismaClient.like.create({
                data: validated
            })

            return formatedSuccessResponse("success like");
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }


    static async destroy(request: LikeRequest, response: Response, next: NextFunction) {

        const validated = Validation.validate(LikeValidation.STORE, request);
        console.log(validated)
        try {
            const post = await prismaClient.like.deleteMany({
                where: { post_id: validated.post_id, user_id: validated.user_id }
            });

          
            return formatedSuccessResponse("Like deleted successfully");
        } catch (error) {
            throw new ResponseError(404, error as any);
        }

        // Format dan kirim respons

    }
}
