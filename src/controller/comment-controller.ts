import {Request, Response, NextFunction} from "express";
import { LikeRequest } from "../model/like-model";
import { LikeService } from "../service/like-service";
import { CommentService } from "../service/comment-service";
import { CommentRequest, CommentRequestUpdate } from "../model/comment-model";


export class CommenController {

    static async index(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await CommentService.index(req);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            var request: CommentRequest = req.body as CommentRequest;
            const response = await CommentService.store(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            var request: CommentRequestUpdate = req.body as CommentRequestUpdate;
            const response = await CommentService.update(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {

        try {
    
            const response = await CommentService.destroy(req);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }
}