import {
    RegisterRequest,
    LoginUserRequest,
    OTPRequest,
    VerifyOTPRequest,
    SummaryRequest,
} from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { UserRepository } from "../repository/user-repository";
import { NextFunction, Response } from "express";
import { FormatedResponse, formatedSuccessResponse } from "../type/user-request";
import jwt from "jsonwebtoken"
import { createOTP, saveOTP, validateOTP } from "../helper/otp"
import { sendOTP } from "../application/mailer"
import { logger } from "../application/logging";

export class UserService {

    static async register(request: RegisterRequest, response: Response, next: NextFunction): Promise<FormatedResponse> {

        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const userIsExist: boolean = await UserRepository.userIsExsist(request)

        if (userIsExist) {

            throw new ResponseError(400, "user exist")

        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });

        var otpRequest = {
            email: user.email
        }

        const resultOtp = await this.sendOtp(otpRequest)

        if (resultOtp.success !== true) {
            logger.error("faled gnerate otp", resultOtp)
            throw new ResponseError(403, "faield generarte otp")
        }

        return formatedSuccessResponse("berhasil register, kode otp telah di kirim ke email");
    }

    static async login(request: LoginUserRequest): Promise<FormatedResponse> {

        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const { username, password } = loginRequest;


        // Cari pengguna berdasarkan email
        const user = await prismaClient.user.findUnique({ where: { email: username } });

        if (!user) {
            throw new Error('User not found');
        }

        // Verifikasi kata sandi
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        if (user === null) {
            throw new ResponseError(401, " user not found");
        }

        // const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        // if (!isPasswordValid) {
        //     throw new ResponseError(401, "Username or password is wrong");
        // }

        const key = process.env.JWT_KEY || ""
        const refresh_key = process.env.JWT_REFRESH_KEY || ""

        const accessToken = jwt.sign({ phone_number: username }, key, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ phone_number:username }, refresh_key, { expiresIn: '15d' });

        const userResponse = {
            id: user.id,
            email: user.email,
            bio: user.bio,
            firstname:user.firstname,
            lastname: user.firstname,
            token: accessToken,
            refreshToken: refreshToken

        }

        const resultOtp = await this.sendOtp({ email: user.email })

        if (resultOtp.success !== true) {
            logger.error("faled gnerate otp", resultOtp)
            throw new ResponseError(403, "faield generarte otp")
        }
        const response = formatedSuccessResponse(userResponse);


        return response;
    }

 
 
    static async sendOtp(request: OTPRequest): Promise<FormatedResponse> {
        const otpRequest = Validation.validate(UserValidation.SENDOTP, request);

        const otpData = createOTP(4, 5); // OTP panjang 6, kadaluarsa 5 menit
        saveOTP(otpRequest.email, otpData);
        const success: Boolean = await sendOTP(otpRequest.email, otpData.otp);

        if (!success) {
            throw new ResponseError(400, "failed send otp")
        }

        const response = formatedSuccessResponse("success send otp. check your email");
        return response;
    }


    static async verifyOtp(request: VerifyOTPRequest): Promise<FormatedResponse> {
        const otpRequest = Validation.validate(UserValidation.VERIFYOTP, request);

        const success: Boolean = validateOTP(otpRequest.email, otpRequest.code);

        if (!success) {
            throw new ResponseError(400, "your code is wrong")
        }

        const response = formatedSuccessResponse("success send otp. check your email");
        return response;
    }

    static async summary(request: SummaryRequest): Promise<FormatedResponse> {



        try {
            const data = await prismaClient.post.findMany({
                where : {user_id : Number(request.userid)},
                select:{
                    id: true,
                    user_id: true,
                    content: true,
                    media_url: true,
                    _count: {
                        select : {
                            Like : true,
                            Comment : true
                        },
                        
                    }
                }
            })

            return formatedSuccessResponse(data);
        } catch (error) {
            throw new ResponseError(400,error as any)
        }
    }

}
