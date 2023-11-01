import { Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { SocketUserDTO } from 'src/user/dto/SocketUser.dto';
import { createUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class WebSocketService {
  private user: Map<string, SocketUserDTO> = new Map();
  private waitingList: string[] = [];
  private pairedUsers: Map<string, string> = new Map();

  async handleOnUserJoined(
    server: Server,
    client: any,
    newUser: SocketUserDTO,
  ) {
    if (this.user.get(client.id)) {
      if (this.waitingList.includes(client.id)) {
        return;
      } else {
        this.waitingList.push(client.id);
        server.to(client.id).emit('joinSuccess', this.user.get(client.id));
      }

      return;
    } else {
      this.user.set(client.id, newUser);
      this.waitingList.push(client.id);
      server.to(client.id).emit('joinSuccess', this.user.get(client.id));
      return;
    }
  }

  async handleOnDisconnect(server: Server, client: any) {
    if (!this.user.get(client.id)) return;

    if (this.waitingList.includes(client.id)) {
      const findIdx = this.waitingList.findIndex((user) => user === client.id);
      if (findIdx != -1) {
        this.user.delete(client.id);

        this.waitingList.splice(findIdx, 1);
        return;
      }
      return;
    }

    if (this.pairedUsers.get(client.id)) {
      const otherUser = this.pairedUsers.get(client.id);
      if (otherUser) {
        this.pairedUsers.delete(client.id);
        this.user.delete(client.id);
        this.pairedUsers.delete(otherUser);
        this.waitingList.push(otherUser);
        server.to(otherUser).emit('userLeft');
        return;
      }
    }
    this.pairedUsers.delete(client.id);
    this.user.delete(client.id);
  }

  randomIdx() {
    const randomIndex = Math.floor(Math.random() * this.waitingList.length);
    return randomIndex;
  }

  async handleOnFindUser(client: any, server: Server) {
    if (this.waitingList.length == 1) {
      server.to(client.id).emit('noUser');
      return;
    }

    let randomIdx = this.randomIdx();
    let randomUser = this.waitingList[randomIdx];
    if (randomUser) {
      while (randomUser === client.id) {
        randomIdx = this.randomIdx();
        randomUser = this.waitingList[randomIdx];
        console.log(randomUser, client.id);
      }

      const clientIdx = this.waitingList.findIndex(
        (user) => user === client.id,
      );
      if (clientIdx !== -1) {
        this.waitingList.splice(clientIdx, 1);
        this.waitingList.splice(randomIdx, 1);
        this.pairedUsers.set(client.id, randomUser);
        this.pairedUsers.set(randomUser, client.id);
        server.to(randomUser).emit('userFound', { remoteId: client.id });
        server.to(client.id).emit('userFound', { remoteId: randomUser });
        return;
      }
    }
  }

  async handleOnSendMessage(server: Server, client: any, data: any) {
    const user = this.user.get(client.id);
    if (!user) return;
    const otherUser = this.pairedUsers.get(client.id);
    if (!otherUser) return;
    server
      .to(otherUser)
      .emit('OnMessage', { message: data.message, name: user.name });
  }
}
