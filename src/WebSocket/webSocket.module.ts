import { Module } from "@nestjs/common";
import { WebSocketGateWay } from "./webSocket.gateway";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { WebSocketService } from "./webSocket.service";
import { MyMailService } from "src/mail.service";

@Module({
    providers:[WebSocketGateWay,AuthService,UserService,JwtService,PrismaService,WebSocketService,MyMailService]
})

export class WebSocketModule {}