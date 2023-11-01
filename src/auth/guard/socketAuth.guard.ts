import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const request = context.switchToHttp().getRequest();

    console.log("hello")
   return false;
  }
}