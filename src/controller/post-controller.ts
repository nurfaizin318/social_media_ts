import {Request, Response, NextFunction, request} from "express";
import { PostRequest, PostRequestDelete, PostRequestUpdate } from "../model/post-model";
import { PostService } from "../service/post-service";


export class PostController {

    static async store(req: Request, res: Response, next: NextFunction) {

        try {
            var request: PostRequest = req.body as PostRequest;
            request.media_url = req.file?.filename ?? ""
            const response = await PostService.store(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {

        console.log("post controller ", req.file?.filename)
        try {
            var request: PostRequestUpdate = req.body as PostRequestUpdate;
            request.media_url = req.file?.filename ?? ""
            const response = await PostService.update(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {

        try {
            var request: PostRequestDelete = req.body as PostRequestDelete;
            request.id = Number(req.params.id)
            const response = await PostService.destroy(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }
}