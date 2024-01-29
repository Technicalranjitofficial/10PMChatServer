import { Module } from '@nestjs/common';
// import { WebSocketGateWay } from 'src/WebSocket/webSocket.gateway';
import { WebSocketService } from 'src/WebSocket/webSocket.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
    controllers: [],
    providers: [WebSocketService],
    imports: [
        
        
    ],
 
})
export class NotificationsModule {}
