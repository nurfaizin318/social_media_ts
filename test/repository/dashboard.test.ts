

import { PrismaClient } from "@prisma/client";
import { DashboardRepository } from "../../src/repository/dashboard-repository";


jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        banner: {
            findMany: jest.fn(),
          
        },
        menu: {
            findMany: jest.fn(),
          
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});



  describe('DashboardRepository', () => {

    let prismaClient;

    beforeAll(() => {
        prismaClient = new PrismaClient();

    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getBanner', () => {
      it('should return a list of banners', async () => {
        const mockBanners = [{ id: 1, name: 'Banner1' }, { id: 2, name: 'Banner2' }];
        (prismaClient.banner.findMany as jest.Mock).mockResolvedValue(mockBanners);
  
        const result = await DashboardRepository.getBanner();
  
        expect(prismaClient.banner.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockBanners);
      });
  
      it('should handle errors', async () => {
        const errorMessage = 'Something went wrong';
        (prismaClient.banner.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));
  
        await expect(DashboardRepository.getBanner()).rejects.toThrow(errorMessage);
        expect(prismaClient.banner.findMany).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('getMenu', () => {
      it('should return a list of menus', async () => {
        const mockMenus = [{ id: 1, name: 'Menu1' }, { id: 2, name: 'Menu2' }];
        (prismaClient.menu.findMany as jest.Mock).mockResolvedValue(mockMenus);
  
        const result = await DashboardRepository.getMenu();
  
        expect(prismaClient.menu.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockMenus);
      });
  
      it('should handle errors', async () => {
        const errorMessage = 'Something went wrong';
        (prismaClient.menu.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));
  
        await expect(DashboardRepository.getMenu()).rejects.toThrow(errorMessage);
        expect(prismaClient.menu.findMany).toHaveBeenCalledTimes(1);
      });
    });
  });