// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'http';

// @WebSocketGateway({
//   cors: {
//     origin: '*', // allow request from all domains
//   },
// })
// export class NotificationGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {

//   @WebSocketServer()
//   server: Server;

//   constructor() {}
//   handleConnection(client: any, ...args: any[]) {
//     console.log('conection');
//   }
//   handleDisconnect(client: any) {}


//   handleOnSendNotification(message: string) {
//     console.log(message);
//     this.server.emit('notification', message);
//   }
// }
