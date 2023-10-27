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


@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot()],
  controllers: [UserController,AuthController],
  providers: [AuthService,PrismaService,UserService,JwtService],
})
export class AppModule {}
