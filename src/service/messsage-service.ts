import { NextFunction, Response, Request } from "express";
import { ResponseError } from "../error/response-error";
import { formatedSuccessResponse, FormatedResponse } from "../type/user-request";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { MessageRequest, MessageRequestDetail, MessageRequestUpdate } from "../model/message-model";
import { MessageValidation } from "../validation/message-validation";





export class MessageService {


    static async index(request: Request): Promise<FormatedResponse> {
        // Validasi inputv\
        try {
                const data = await prismaClient.message.groupBy({
                    where:{to_Id: Number(request.params.id)},
                    by: ["from_id"], 
                    
                    _max: {
                        from_id: true,
                        content: true,
                        
                    }
                })

                const resultWithUsers = await Promise.all(data.map(async (group) => {
                    const user = await prismaClient.user.findUnique({
                      where: { id: Number(group._max.from_id )}, 
                      select :{
                         firstname : true,
                         lastname: true
                      } // Ambil data user berdasarkan `from_id`
                    });
                    return {
                      ...group,  // Data hasil groupBy
                      user: user,  // Tambahkan data user
                    };
                  }));
                  

            return formatedSuccessResponse(resultWithUsers);
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }

    static async show(request: MessageRequestDetail): Promise<FormatedResponse> {


        const validated = Validation.validate(MessageValidation.DETAIL, request);

        console.log(validated)

        // Validasi inputv\
        try {

            const data = await prismaClient.message.findMany({
                where : {
                    OR :[{
                        from_id : validated.from_id , to_Id : validated.to_Id
                    },
                {
                    from_id : validated.to_Id , to_Id : validated.from_id
                }]
                    } ,
              orderBy : {
                id : "asc"
              }
            })

            return formatedSuccessResponse(data);
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }
    


    static async store(request: MessageRequest): Promise<FormatedResponse> {
        // Validasi inputv\

        const validated = Validation.validate(MessageValidation.STORE, request);
 
        try {

            const data = await prismaClient.message.create({
                data: {
                    from_id :validated.from_id,
                    to_Id : validated.to_Id,
                    content : validated.content,
                
                }
            })

            return formatedSuccessResponse("success add message");
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }

    
    static async update(request: MessageRequestUpdate): Promise<FormatedResponse> {
        // Validasi inputv\

        const validated = Validation.validate(MessageValidation.UPDATE, request);

        try {

            const data = await prismaClient.message.update({
                where : { id :  request.id },
                data : validated
            })

            return formatedSuccessResponse("success update message");
        } catch (error) {

            throw new ResponseError(500, error as any)
        }
    }



    static async destroy(request: Request) {

        try {
            const post = await prismaClient.message.deleteMany({
                where: { id : Number(request.params.id) }
            });

          
            return formatedSuccessResponse("message deleted successfully");
        } catch (error) {
            throw new ResponseError(404, error as any);
        }


    }
}
