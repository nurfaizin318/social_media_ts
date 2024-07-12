import supertest from "supertest";
import { server } from "../../src/application/web";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';


jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        user: {
            count: jest.fn(),
            create: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {})
    })
  }));


describe('POST /api/users', () => {

    let prismaMock;


    beforeAll(() => {
        prismaMock = new PrismaClient();

    });

    beforeEach(() => {
        prismaMock.user.count.mockClear();
        prismaMock.user.create.mockClear();
        
    });



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

        const mockUser = {
                email: "test@gmail.com",
                username: "test",
                password: "test",
                phone_number: "088888888888"
            };

        prismaMock.user.count.mockResolvedValue(0);
        prismaMock.user.create.mockResolvedValue(mockUser);

        const response = await supertest(server)
            .post("/api/users")
            .send({
                email: "test@gmail.com",
                username: "test",
                password: "test",
                phone_number: "088888888888"
            });

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true)

    });

});

describe('POST "/api/users/send-otp', () => {

    let transporterMock;

    beforeAll(() => {
   
    });
  
    beforeEach(() => {
   
    });

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