import {Request, Response, NextFunction} from "express";
import { CommentService } from "../service/comment-service";
import { MessageRequest, MessageRequestDetail, MessageRequestUpdate } from "../model/message-model";
import { MessageService } from "../service/messsage-service";


export class MessageController {

    static async index(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await MessageService.index(req);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async show(req: Request, res: Response, next: NextFunction) {

        try {
            var request: MessageRequestDetail = req.body as MessageRequestDetail;
            const response = await MessageService.show(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }


    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            var request: MessageRequest = req.body as MessageRequest;
            const response = await MessageService.store(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            var request: MessageRequestUpdate = req.body as MessageRequestUpdate;
            const response = await MessageService.update(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {

        try {
    
            const response = await MessageService.destroy(req);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }
}