import { NextFunction,Response,Request } from "express";
import { DashboardService } from "../service/dashboard-service";


export class DashboardController{

    static async menu(req: Request, res: Response, next: NextFunction) {
        try {
     
            const response = await DashboardService.getMenu(req,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async banner(req: Request, res: Response, next: NextFunction) {
        try {
     
            const response = await DashboardService.getBanner(req,res,next);
            res.status(200).json(response
                
            )
        } catch (e) {
            next(e);
        }
    }

}
