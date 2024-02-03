// import { Controller, Inject, Post } from '@nestjs/common';
// import { WebSocketGateway } from '@nestjs/websockets';
// // import { WebSocketGateway } from '@nestjs/websockets';
// // import { WebSocketGateWay } from 'src/WebSocket/webSocket.gateway';
// import { WebSocketService } from 'src/WebSocket/webSocket.service';
// // import { NotificationGateway } from 'src/notificatio-gateway/Notification.gateway';

// @Controller('notifications')
// export class NotificationsController {
//     constructor(
//         @Inject(NotificationGateway) private readonly webSocketGateway: NotificationGateway
//     ) {}



//     @Post('send')
//     async sendNotification(){
//         console.log("message received");
//         this.webSocketGateway.handleOnSendNotification("Please Give your feedback : https://docs.google.com/forms/d/e/1FAIpQLSeo5NFu8uLBxNjUOmBoj3b_ffriBCPamybBwRqsv5CREv-J8g/viewform?usp=sf_link")
//     }

// }
