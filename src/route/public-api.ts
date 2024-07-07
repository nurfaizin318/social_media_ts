import express from "express";
import {UserController} from "../controller/user-controller";
import { MapController } from "../controller/map-controller";
import { RideController } from "../controller/ride-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);
publicRouter.post("/api/users/send-otp", UserController.sendOtp);
publicRouter.post("/api/users/verify-otp", UserController.validateOtp);

