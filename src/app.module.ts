import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { WebSocketModule } from './WebSocket/webSocket.module';
import { MyMailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
// import { NotificationsController } from './notifications/notifications.controller';
// import { NotificationsService } from './notifications/notifications.service';
// import { NotificationsModule } from './notifications/notifications.module';
import * as path from 'path';
import * as mailgunTransport from 'nodemailer-mailgun-transport';
// import { NotificationGateway } from './notificatio-gateway/Notification.gateway';
import { WebSocketService } from './WebSocket/webSocket.service';
import { WebSocketGateWay } from './WebSocket/webSocket.gateway';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    WebSocketModule,
    MailerModule.forRoot({
      transport: {
        // service:"Mailgun",
        host: 'smtp.mailgun.org',

        auth: {
          user: `${process.env.MAIL_USERNAME}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        
        },
      },
      defaults: {
        from: 'Matcher<noreply@kiitconnect.live>',
      },
      template: {
        dir: path.join(__dirname , '../src/template'), // Replace with the actual path to your templates
        adapter: new EjsAdapter(), // Use the appropriate adapter for your templating engine
        options: {
          strict: false,
        },
      },
    }),

  ],
  controllers: [UserController, AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtService,
    MyMailService,
    WebSocketService,
    WebSocketGateWay

    
  ],
})
export class AppModule {}
