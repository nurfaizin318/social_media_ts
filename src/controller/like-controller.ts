import {Request, Response, NextFunction} from "express";
import { PostRequest, PostRequestDelete, PostRequestUpdate } from "../model/post-model";
import { PostService } from "../service/post-service";
import { LikeRequest } from "../model/like-model";
import { LikeService } from "../service/like-service";


export class LikeController {

    static async index(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await LikeService.index(req,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async store(req: Request, res: Response, next: NextFunction) {

        try {
            var request: LikeRequest = req.body as LikeRequest;
            const response = await LikeService.store(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {

        try {
            var request: LikeRequest = req.body as LikeRequest;
            const response = await LikeService.destroy(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }
}