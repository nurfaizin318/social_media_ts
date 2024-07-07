import express from "express";
import {publicRouter} from "../route/public-api";
import {errorMiddleware} from "../middleware/error-middleware";
import {apiRouter} from "../route/api";
import http from 'http';
import {SocketManager} from "../application/socket"




const web = express();
export const server = http.createServer(web);
export const  SocketService = new SocketManager(server);
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
