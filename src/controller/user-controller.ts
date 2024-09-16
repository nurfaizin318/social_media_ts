import {Request, Response, NextFunction, response} from "express";
import {RegisterRequest, LoginUserRequest, UpdateUserRequest, OTPRequest, VerifyOTPRequest, SummaryRequest} from "../model/user-model";
import { UserService } from "../service/user-service";



export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterRequest = req.body as RegisterRequest;
            const response = await UserService.register(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async sendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const request: OTPRequest = req.body as OTPRequest;
            const response = await UserService.sendOtp(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async validateOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const request: VerifyOTPRequest = req.body as VerifyOTPRequest;
            const response = await UserService.verifyOtp(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }


    static async summary(req: Request, res: Response, next: NextFunction) {
        try {
            const request: SummaryRequest = req.body as SummaryRequest;
            request.userid = req.params.id
            const response = await UserService.summary(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    
    // static async get(req: UserRequest, res: Response, next: NextFunction) {
    //     try {
    //         const response = await UserService.get(req.user!);
    //         res.status(200).json({
    //             data: response
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // static async update(req: UserRequest, res: Response, next: NextFunction) {
    //     try {
    //         const request: UpdateUserRequest = req.body as UpdateUserRequest;
    //         const response = await UserService.update(req.user!, request);
    //         res.status(200).json({
    //             data: response
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // static async logout(req: UserRequest, res: Response, next: NextFunction) {
    //     try {
    //         await UserService.logout(req.user!);
    //         res.status(200).json({
    //             data: "OK"
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // }

}
