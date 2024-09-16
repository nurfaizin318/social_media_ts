


import { NextFunction, Response, Request } from "express";
import { ResponseError } from "../error/response-error";
import { formatedSuccessResponse, FormatedResponse } from "../type/user-request";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { FriendshipRequest } from "../model/friendship-model";
import { FriendShipvalidation } from "../validation/friendship-validation";


export class FriendshipService {

    //show request frienship
    static async index(request: Request, response: Response, next: NextFunction): Promise<FormatedResponse> {

        const requestFriendList = await prismaClient.friendship.findMany({
            where: {  to_id: Number(request.params.id),status: 0 }
        });

        if (!requestFriendList) {
            throw new ResponseError(404, "request freindship is empty");
        }

        return formatedSuccessResponse(requestFriendList);
    }



    static async friendList(request: Request, response: Response, next: NextFunction): Promise<FormatedResponse> {

        const requestFriendList = await prismaClient.friendship.findMany({
     
            where: {
                to_id: Number(request.params.id),status: 1,
                
            }, select : {
                id: true,
                from : true
            }
        });

        if (!requestFriendList) {
            throw new ResponseError(404, "request freindship is empty");
        }

        // Format dan kirim respons
        return formatedSuccessResponse(requestFriendList);
    }


    
    static async update(request: Request, response: Response, next: NextFunction): Promise<FormatedResponse> {

        const requestFriendList = await prismaClient.friendship.update({
            where : {id : Number(request.params.id)},
            data :{status : 1}
        });

        if (!requestFriendList ) {
            throw new ResponseError(404, "request freindship is empty");
        }

        // Format dan kirim respons
        return formatedSuccessResponse(requestFriendList);
    }


    static async store(request: FriendshipRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {
        // Validasi inputv\

        const validated = Validation.validate(FriendShipvalidation.STORE, request);

        try {
           await prismaClient.friendship.create({
                data: {
                    from_id: Number(validated.from_id),
                    to_id: Number(validated.to_id)
                }
            })

            return formatedSuccessResponse("friendship request success");
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }

    

    static async destroy(request: Request, response: Response, next: NextFunction) {

        console.log("friendhsip service",request.params.id)
        const friendship = await prismaClient.friendship.delete({
            where: { id: Number(request.params.id) }
        });

        if (!friendship) {
            throw new ResponseError(404, "Post not found");
        }

        return formatedSuccessResponse("Post deleted successfully");
    }
}
