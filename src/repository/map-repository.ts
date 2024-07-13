import axios, { AxiosResponse } from "axios";
import {prismaClient} from "../application/database";
import { ResponseError } from "../error/response-error";
import { GetListPlaceRequest, GetPolylineRequest, ResponsePlace, ResponsePolyline } from "../model/map-model";
import { RideTypeRequest } from "../model/ride-model";



export class MapRepository {

    static async  getPolyline(params: RideTypeRequest):Promise<AxiosResponse<ResponsePolyline, any>> {
        
        const result = await axios.get<ResponsePolyline>(`http://router.project-osrm.org/route/v1/driving/${params.location};${params.destination}?overview=full&geometries=polyline`)

        return result
    }

    static async  getListplace(params:string):Promise<AxiosResponse<ResponsePlace, any>> {
        
        const result = await axios.get<ResponsePlace>(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${params}&format=jsonv2&limit=8`)

        return result
    }
  
  
}