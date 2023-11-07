import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail.service';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,JwtService,MailService]
})
export class UserModule {}
