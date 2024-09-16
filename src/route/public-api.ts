import express from "express";
import {UserController} from "../controller/user-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/auth/register", UserController.register);
publicRouter.post("/api/auth/login", UserController.login);
publicRouter.post("/api/auth/send-otp", UserController.sendOtp);
publicRouter.post("/api/auth/verify-otp", UserController.validateOtp);

