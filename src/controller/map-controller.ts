import { NextFunction,Response,Request } from "express";
import { MapServices } from "../service/map-services";
import { GetListPlaceRequest, GetPolylineRequest } from "../model/map-model";




export class MapController{


    static async getPlace(req: Request, res: Response, next: NextFunction) {

        try {
            const request : GetListPlaceRequest =  req.body as GetListPlaceRequest
            const response = await MapServices.getListPlace(request,res,next);
            res.status(200).json(response)
            
        } catch (e) {
            next(e);
        }
    }


}