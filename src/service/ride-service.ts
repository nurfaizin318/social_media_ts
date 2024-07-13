import { NextFunction, Response } from "express";
import { GetListPlaceRequest, GetPolylineRequest, ResponsePlace, ResponsePolyline } from "../model/map-model";
import { FormatedResponse, formatedSuccessResponse } from "../type/user-request";
import { Validation } from "../validation/validation";

import { RideType } from "@prisma/client";
import { OrderRequest, RideTypeRequest } from "../model/ride-model";
import { RideValidation } from "../validation/ride-validation";
import { prismaClient } from "../application/database";

import { ResponseError } from "../error/response-error";
import { SocketService } from "../application/web";
import { date } from "zod";
import { MapRepository } from "../repository/map-repository";

export class RideService  {

  
    static updatePrice =  (data:RideType[],distance: number) : RideType[] => {
        return data.map(ride => ({
            ...ride,
            price: ride.price * distance
        }));
    }

    static async getRideType(request: RideTypeRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {
        const rideRequest = Validation.validate(RideValidation.RIDETYPE, request);

        const result = await MapRepository.getPolyline(rideRequest)

        console.log(result.data)
            if(result.status !== 200){
               let error = new ResponseError(203,"error from osrm")
               next(error)
            }
      
            
        const listRideType = await prismaClient.rideType.findMany()
        let distance = result.data.routes[0].distance / 1000.0
        let dataRide = this.updatePrice(listRideType,Math.round(distance))

        let listRide  = {
            route: result.data.routes[0].geometry,
            rideList: dataRide ,
       
        }
      
        return formatedSuccessResponse(listRide);
    }
    

     async searchDriver(request: OrderRequest): Promise<FormatedResponse> {
        const order = Validation.validate(RideValidation.ORDER, request);
        
        const result = await   SocketService.broadcastToDriver(order)

        if(result.success === false){
            throw new ResponseError(410, "failed looking for driver")
        }
      
        return formatedSuccessResponse({});
    }
    


  
}