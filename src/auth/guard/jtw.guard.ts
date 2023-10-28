import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JWTGuard implements CanActivate{

    constructor(private JWTService:JwtService){}
    async canActivate(context: ExecutionContext):Promise<boolean>  {
        
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if(!authHeader) throw new UnauthorizedException();

        const [type,token] = authHeader.split(' ');
        if(type !== 'Bearer') throw new UnauthorizedException();

        try {
            const user = await this.JWTService.verifyAsync(token,{
                secret:process.env.ACCESS_TOKEN_SECRET
            })
            request['user']= user;
        } catch (error) {
            throw new UnauthorizedException();
            
        }


        return true;
        
    }

}