import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken"
import { error } from "winston";

export type TokenResult = {
    token: string
    refreshToken: string
}

export class UserTest {

    
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                phone_number: "088888888888"
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                password: await bcrypt.hash("test", 10),
                email: "test",
                phone_number: "088888888888"

            }
        })
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test"
            }
        })

        if (!user) {
            throw new Error("User is not found");
        }

        return user;
    }

    static  generateToken():string | undefined{
        const payload = {phone_number: "085641380676" }; // Payload token
        const secret = "ini-rahasia"; // Kunci rahasia untuk menandatangani token
       

        try{
            const token =  jwt.sign(payload, secret, { expiresIn: '1h' });
            console.log("token",token)
            return token
        } catch{
            console.log("error generate token",error)
           throw new Error
        }
   
   
    }
}

