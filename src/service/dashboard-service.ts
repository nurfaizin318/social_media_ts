import { NextFunction, Request, Response } from "express";
import { BannerResponse } from "../model/banner-model";
import { DashboardRepository } from "../repository/dashboard-repository";
import { MenuResponse } from "../model/menu-model";
import { FormatedResponse, formatedSuccessResponse } from "../type/user-request";
import { prismaClient } from "../application/database";




export class DashboardService {
    static async getBanner(req: Request, res: Response, next: NextFunction):Promise<FormatedResponse> {

        let listBanner: BannerResponse[] = [];

        try {
            listBanner =  await DashboardRepository.getBanner();
     
        } catch (error) {
            next(error);
        }
        return formatedSuccessResponse(listBanner);
    }

    static async getMenu(req: Request, res: Response, next: NextFunction):Promise<FormatedResponse> {
        let listMenu: MenuResponse[] = [];

        try {
            listMenu = await DashboardRepository.getMenu();
     
        } catch (error) {
            next(error);
        }
        return formatedSuccessResponse(listMenu);
    }
} 