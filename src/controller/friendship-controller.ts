import {Request, Response, NextFunction} from "express";
import { FriendshipRequest } from "../model/friendship-model";
import { FriendshipService } from "../service/friendship-service";



export class FriendshipController {

    static async index(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await FriendshipService.index(req,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async friendList(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await FriendshipService.friendList(req,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            var request: FriendshipRequest = req.body as FriendshipRequest;
            const response = await FriendshipService.store(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await FriendshipService.update(req,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await FriendshipService.destroy(req,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }
}