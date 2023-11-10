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
import * as path from 'path';


@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot(),WebSocketModule,MailerModule.forRoot({
    transport: {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      
    },
    defaults:{
      from:process.env.MAIL_USERNAME
    },

    template:{
      adapter:new EjsAdapter(),
      dir:path.join(__dirname,"../src/template/"),
      options:{
      strict:false
      }

    }
  }),],
  controllers: [UserController,AuthController],
  providers: [AuthService,PrismaService,UserService,JwtService,MyMailService],
})
export class AppModule {}
