import supertest from "supertest";
import {server} from "../src/application/web";
import {logger} from "../src/application/logging";
import {UserTest} from "./test-util";
import bcrypt from "bcrypt";


describe('POST /api/users', () => {

   
    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(server)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                phone_number: "",
                
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
   
    });

    it('should register new user', async () => {
        const response = await supertest(server)
            .post("/api/users")
            .send({
                email: "test@gmail.com",
                username: "test",
                password: "test",
                phone_number:"088888888888"
            });

        expect(response.status).toBe(200);
 
        expect(response.body.success).toBe(true)
 
    });

});

describe('POST "/api/users/send-otp', () => {


    it('should success send otp', async () => {
        const response = await supertest(server)
            .post("/api/users/send-otp")
            .send({
                email: "nurfaizin318@gmail.com",
           
            });

        expect(response.status).toBe(200);
        expect(response.body.data).toBe("success send otp. check your email");
  
    });


    it('should failed send otp', async () => {
        const response = await supertest(server)
            .post("/api/users/send-otp")
            .send({
                email: "",
           
            });
        expect(response.status).toBe(400);
     
  
    });
})