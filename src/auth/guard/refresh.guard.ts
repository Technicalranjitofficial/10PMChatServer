import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import e, { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private JWTService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromRequest(request);
    if (!token) throw new UnauthorizedException();

    try {
      const user = await this.JWTService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
