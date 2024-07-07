import { NextFunction, Response } from "express";
import { GetListPlaceRequest, GetPolylineRequest, ResponsePlace, ResponsePolyline } from "../model/map-model";
import { FormatedResponse, formatedSuccessResponse } from "../type/user-request";
import { Validation } from "../validation/validation";
import { MapValidation } from "../validation/map-validation";
import { ResponseError } from "../error/response-error";
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { RideValidation } from "../validation/ride-validation";
import { MapRepository } from "../repository/map-repository";

export class MapServices {

    static async getPolyline(request: GetPolylineRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {
        // const getPopylineRequest = Validation.validate(MapValidation.POLYLINE, request);

        // const result = await MapRepository.getPolyline(getPopylineRequest)

        // console.log(result.data)
        //     if(result.status !== 200){
        //        let error = new ResponseError(203,"error from osrm")
        //        next(error)
        //     }

        //     let responsePolyline = {
        //         route: result.data.routes[0].geometry,
        //         distance: result.data.routes[0].distance / 1000.0,
           
        //     }
        return formatedSuccessResponse({});
    }
    
    static async getListPlace(request: GetListPlaceRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {
        const getPlaceRequest = Validation.validate(MapValidation.PLACE, request);
        let newStr = getPlaceRequest.place.split(" ").join("+");
      
        const result = await MapRepository.getListplace(newStr)
        console.log(result.status)
            if(result.status !== 200){
               let error = new ResponseError(203,"error from osrm")
               next(error)
            }

    
        return formatedSuccessResponse(result.data);
    }
}