import supertest from "supertest";
import { server } from "../../src/application/web";
import axios, { AxiosResponse } from "axios";



jest.mock('axios');

describe('POST /api/map/place', () => {

    it('should error if empty place request', async () => {

        axios.get = jest.fn().mockRejectedValue(new Error('Network error'))


        const response = await supertest(server)
            .post("/api/map/place")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                place: "",
            });

        expect(response.status).toBe(400);

    });


    it('should success get Place', async () => {

        const data = { status: 200 };

        // Now mock axios get method
        axios.get = jest.fn().mockResolvedValue(data);

        const response = await supertest(server)
            .post("/api/map/place")
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                place: "stasiun pondok ranji",
            });
       
        expect(response.status).toBe(200);
      
    });



});