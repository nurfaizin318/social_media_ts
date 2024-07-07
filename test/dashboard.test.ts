import {UserTest} from "./test-util";
import supertest from "supertest";
import {server} from "../src/application/web";
import {logger} from "../src/application/logging";



describe('POST /api/dashboard',  () => {


    it('should get menu', async () => {

        const response = await supertest(server)
            .get("/api/dashboard/menu")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength;
 
    });

    
    it('should get banner', async () => {
           
        const response = await supertest(server)
            .get("/api/dashboard/banner")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength;
 
    });
})