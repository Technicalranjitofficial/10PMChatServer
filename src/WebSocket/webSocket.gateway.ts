import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { SocketAuthGuard } from 'src/auth/guard/socketAuth.guard';

import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { SocketUserDTO } from 'src/user/dto/SocketUser.dto';
import { WebSocketService } from './webSocket.service';
@WebSocketGateway({
  cors: {
    origin: "*", // allow request from all domains
  },
})
export class WebSocketGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly socketService: WebSocketService,
  ) {}

  @WebSocketServer()
  server: Server;

  // @UseGuards(SocketAuthGuard)
  async handleConnection(client: any, ...args: any[]) {
    console.log('connection', client.id);
    const accessToken = client.handshake.query.accessToken;
    try {
      const userData = await this.authService.validateUserByJwt(accessToken);
      const { user } = userData;
      const newUser: SocketUserDTO = {
        id: user.id,
        name: user.name,
      };

      await this.socketService.handleOnUserJoined(this.server, client, newUser);
    } catch (error) {
      console.log(error);
      this.server.emit('exception', new WsException('Unauthorized Access'));
      return;
    }
  }

  handleDisconnect(client: any) {
    this.socketService.handleOnDisconnect(this.server, client);
  }

  @SubscribeMessage('findUserToJoin')
  async handleOnFindUserToJoin(client: any, data: any) {
    this.socketService.handleOnFindUser(client, this.server);
  }

  @SubscribeMessage('sendMessage')
  async handleOnSendMessage(client: any, data: any) {
    await this.socketService.handleOnSendMessage(this.server, client, data);
  }
}
