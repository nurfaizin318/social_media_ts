import {UserTest} from "../test-util";
import supertest from "supertest";
import {server} from "../../src/application/web";
import {logger} from "../../src/application/logging";
import { PrismaClient } from "@prisma/client";


jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        banner: {
            findMany: jest.fn(),
      
        },
        menu :{
            findMany: jest.fn(),
      
        }
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('POST /api/dashboard',  () => {

    let prismaMock;

    beforeAll(() => {
        prismaMock = new PrismaClient();

    });

    beforeEach(() => {
        prismaMock.menu.findMany.mockClear();
        prismaMock.banner.findMany.mockClear();
        
    });

    
    it('should get menu', async () => {

        const menuMockData = [
            { id: 1, title: 'Dashboard', icon: 'dashboard', color: '#2196F3', enabled: true },
        ]
        prismaMock.menu.findMany.mockResolvedValue(menuMockData);

        const response = await supertest(server)
            .get("/api/dashboard/menu")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty("color");

    });

    
    it('should get banner', async () => {

        const bannerMockData = [
            { id: 1, url: 'https://example.com/banner1', description: 'Banner 1 Description', title: 'Banner 1' },
         
          ];
        prismaMock.banner.findMany.mockResolvedValue(bannerMockData);
           
        const response = await supertest(server)
            .get("/api/dashboard/banner")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty("title");
 
    });
})