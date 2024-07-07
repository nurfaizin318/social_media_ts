import { User } from "@prisma/client";

export type RegisterRequest = {
    username: string;
    password: string;
    email: string;
    phone_number: string;
}

export type LoginUserRequest = {
    prefix: string
    phone_number: string
}

export type UpdateUserRequest = {
    name?: string;
    password?: string;
}


export type LoginResponse = {
    username: string;
    token: string;
    profile: any
}

export type OTPRequest = {
    email: string;

}

export type VerifyOTPRequest = {
    code: string;
    email: string;

}