import supertest from "supertest";
import { logger } from "../src/application/logging";
import { server } from "../src/application/web";
import { UserTest } from "./test-util";



// apiRouter.post("/api/map/polyline", MapController.getPolyline);
// apiRouter.post("/api/map/place", MapController.getPlace);
// apiRouter.post("/api/ride/ride-type", RideController.getRideType);
// apiRouter.post("/api/ride/order-ride", RideController.searchDriver);



describe('POST /api/map/place', () => {

    it('should error if empty place request', async () => {
        const response = await supertest(server)
            .post("/api/map/place")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                place: "",
            });

        expect(response.status).toBe(400);

    });


    it('should error if empty place request', async () => {
        const response = await supertest(server)
            .post("/api/map/place")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                place: "stasiun pondok ranji",
            });
        expect(response.status).toBe(200);
      
    });



});