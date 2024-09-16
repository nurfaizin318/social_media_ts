import http from 'http';
import { Server, Socket } from 'socket.io';
import { prismaClient } from './database';
import { ResponseError } from '../error/response-error';



export class SocketManager {
  private io: Server;
 

  constructor(server: http.Server) {
    this.io = new Server(server);
    this.setupSocketEvents();
    console.log("start socket")
  }

  private async setupSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log('New client connected');
    
   
      
    });
    this.io.on("error",(error)=>{
      console.log("error",error)
      throw new ResponseError(200,error)
    })
  }
}

