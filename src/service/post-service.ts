import { NextFunction, Response, Request } from "express";
import { validate } from "uuid";
import { ResponseError } from "../error/response-error";
import { PostRequest, PostRequestDelete, PostRequestUpdate } from "../model/post-model";
import { formatedSuccessResponse, FormatedResponse } from "../type/user-request";
import { PostValidation } from "../validation/post-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import fs from "fs"
import FileOrganizer from "../helper/multer";





export class PostService {

    // static async index(request) {
    //     // Validasi input
    //     const validatedRequest = validate(PostValidation.INDEX, request);

    //     // Ambil post berdasarkan user_id
    //     const posts = await Post.find({ user_id: validatedRequest.user_id });

    //     if (!posts || posts.length === 0) {
    //         throw new ResponseError(404, "Post not found");
    //     }

    //     // Format dan kirim respons
    //     return formatedSuccessResponse("success get posts", posts);
    // }

    // static async show(request) {
    //     // Validasi input
    //     const validatedRequest = validate(PostValidation.SHOW, request);

    //     // Ambil post berdasarkan id
    //     const post = await Post.findById(validatedRequest.id);

    //     if (!post) {
    //         throw new ResponseError(404, "Post not found");
    //     }

    //     // Format dan kirim respons
    //     return formatedSuccessResponse("success get post", post);
    // }

    static async store(request: PostRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {
        // Validasi inputv\

        const validatedRequest = Validation.validate(PostValidation.UPLOAD, request);
        validatedRequest.user_id = Number(request.user_id)


        try {
            const filePath = request.media_url
            if (!filePath) {

                throw new ResponseError(500, "problem with image")
            }
            const data = await prismaClient.post.create({
                data: validatedRequest
            })

            return formatedSuccessResponse(data);
        } catch (error) {
            fs.unlink(`public/photos/${request.media_url}`, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              
                //file removed
              })
    
            throw new ResponseError(500, error as any)
        }
    }



    static async update(request: PostRequestUpdate, response: Response, next: NextFunction): Promise<FormatedResponse> {
        // Validasi input
        const validated = Validation.validate(PostValidation.UPDATE, request);
        console.log(validated)
        try {

            const post = await prismaClient.post.findUnique({
                where: {
                  id: Number(validated.id),
                }
              })

           let result =  await prismaClient.post.update(

                {
                    where: { id: Number(validated.id)},
                    data: { user_id: Number(validated.user_id), content: validated.content, media_url: validated.media_url }
                }
    
            );
            FileOrganizer.delete(post?.media_url??'')
        } catch (error) {
            console.log(error)
            FileOrganizer.delete(validated.media_url)
            throw new ResponseError(404, "Post not found");
        }

  
        // Format dan kirim respons
        return formatedSuccessResponse("success update post");
    }

    static async destroy(request: PostRequestDelete, response: Response, next: NextFunction){


        // Cari dan hapus post
        const post = await prismaClient.post.delete({
         where : {id : request.id}
        });

        if (!post) {
            throw new ResponseError(404, "Post not found");
        }

        FileOrganizer.delete(post.media_url??"")

        // Format dan kirim respons
        return formatedSuccessResponse("Post deleted successfully");
    }
}
