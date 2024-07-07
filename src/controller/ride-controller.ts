import { NextFunction,Response,Request } from "express";
import { MapServices } from "../service/map-services";
import { GetListPlaceRequest, GetPolylineRequest } from "../model/map-model";
import { OrderRequest, RideTypeRequest } from "../model/ride-model";
import { RideService } from "../service/ride-service";


export class RideController{

    static async getRideType(req: Request, res: Response, next: NextFunction) {
        try {
            
            const request : RideTypeRequest =  req.body as RideTypeRequest
            const response = await RideService.getRideType(request,res,next);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }

    static async searchDriver(req: Request, res: Response, next: NextFunction) {
        try {

            const request : OrderRequest =  req.body as OrderRequest
            const response = await new RideService().searchDriver(request);
            res.status(200).json(response)
        } catch (e) {
            next(e);
        }
    }



}