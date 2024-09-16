import { User } from "@prisma/client";

export type RegisterRequest = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}


export type LoginUserRequest = {
    username: string
    password: string
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

export type SummaryRequest = {
    userid: string;

}