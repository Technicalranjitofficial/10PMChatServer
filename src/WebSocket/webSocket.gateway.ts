// import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsException,
// } from '@nestjs/websockets';
// import { AuthService } from 'src/auth/auth.service';
// import { SocketAuthGuard } from 'src/auth/guard/socketAuth.guard';

// import { Server } from 'socket.io';
// import { UserService } from 'src/user/user.service';
// import { SocketUserDTO } from 'src/user/dto/SocketUser.dto';
// import { WebSocketService } from './webSocket.service';
// @WebSocketGateway({
//   cors: {
//     origin: "*", // allow request from all domains
//   },
// })
// export class WebSocketGateWay
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   server: Server;

//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//     private readonly socketService: WebSocketService,
//   ) {
   
//   }



//    user: Map<string, string> = new Map();

//   // @UseGuards(SocketAuthGuard)

//   // //for chat app
//   // async handleConnection(client: any, ...args: any[]) {
//   //   console.log('connection', client.id);
//   //   const accessToken = client.handshake.query.accessToken;
//   //   console.log(accessToken,client.handshake.query);
//   //   try {
//   //     const userData = await this.authService.validateUserByJwt(accessToken);
     
//   //     console.log(userData);
//   //     const newUser: SocketUserDTO = {
//   //       id: userData.email,
//   //       name: userData.name,
//   //     };

//   //     await this.socketService.handleOnUserJoined(this.server, client, newUser);
//   //   } catch (error) {
//   //     console.log(error);
//   //     this.server.emit('exception', new WsException('Unauthorized Access'));
//   //     return;
//   //   }
//   // }


//   // for kiitconnect app
//   handleConnection(client: any, ...args: any[]) {
//     if(this.server){
//       this.socketService.handleOnConnectUser(this.server, client,"connection");
//     }
//   }


//   handleDisconnect(client: any) {
//     this.socketService.handleOnDisconnectUser(this.server, client);
//   }

//   handleOnSendNotification(msg:string) {
//     this.server.emit('notification',msg);
//   }







//   //endig kiitocnnect app






//   //for chat app
//   // handleDisconnect(client: any) {
//   //   this.socketService.handleOnDisconnect(this.server, client);
//   // }

//   @SubscribeMessage('onClose')
//   async handleOnClose(client: any, data: any) {
//     // console.log("Hello");
//     this.socketService.handleOnCloseConnection(this.server, client);
//   }

//   @SubscribeMessage("onStop")
//   async handleOnStop(client: any, data: any) {
//     this.socketService.handleOnStop(this.server, client);
//   }



//   @SubscribeMessage('findUserToJoin')
//   async handleOnFindUserToJoin(client: any, data: any) {
//     this.socketService.handleOnFindUser(client, this.server);
//   }

  

//   @SubscribeMessage('sendMessage')
//   async handleOnSendMessage(client: any, data: any) {
//     Logger.log(data);
//     await this.socketService.handleOnSendMessage(this.server, client, data);
//   }

//   @SubscribeMessage('userIstyping')
//   async handleOnUserIsTyping(client: any, data: any) {
//     await this.socketService.handleOnTyping(this.server, client,data);
//   }

// }
