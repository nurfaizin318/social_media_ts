import http from 'http';
import { Server, Socket } from 'socket.io';
import { prismaClient } from './database';
import { Driver } from '@prisma/client';
import { OrderRequest } from '../model/ride-model';
import { RideService } from '../service/ride-service';
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
    
      socket.on('driverAccepted', (data: OrderRequest) => {
   
 
      });
      
    });
    this.io.on("error",(error)=>{
      console.log("error",error)
      throw new ResponseError(200,error)
    })
  }

  public async broadcastToDriver(orderData: OrderRequest): Promise<{ success: boolean, message: string }> {
    try {
      let drivers: Driver[] = await prismaClient.driver.findMany({
        where : { rideType_id  : orderData.rideType_id}
      });
  
      await Promise.all(drivers.map(async (data) => {
        console.log(data)
        console.log("emit search driver")
        this.io.to(data.id.toString()).emit('searchDriver', { data: orderData });
      }));

      return { success: true, message: 'All drivers have been notified.' };
    } catch (error) {
   
      return { success: false, message: 'Error broadcasting to drivers.' };
    }
  }
}