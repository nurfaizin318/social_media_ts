import { prismaClient } from "../application/database";
import { BannerResponse } from "../model/banner-model";
import { MenuResponse } from "../model/menu-model";



export class DashboardRepository {

    static async getBanner (): Promise<BannerResponse[]> {

        var listBanner: BannerResponse[] = await prismaClient.banner.findMany();
          console.log(listBanner)
        return listBanner

    }

    static async getMenu(): Promise<MenuResponse[]> {

        var listMenu: MenuResponse[] = await prismaClient.menu.findMany();

        return listMenu
    }
}