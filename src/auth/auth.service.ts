import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

const expiresIn =60* 60 * 1000 * 24;

@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService,private JwtService:JwtService){}

    async login(dto:LoginDTO){

        const user = await this.validateUser(dto);
        const payload = {
            user,
            sub:{
                name:user.name,
            }
        }

       return {
            user,
            backendToken:{
                accessToken:await this.JwtService.signAsync(payload,{
                    //expiresIn 5 MINUTES,
                    expiresIn:"1d",
                
                   secret:process.env.ACCESS_TOKEN_SECRET
                }),

                refreshToken:await this.JwtService.signAsync(payload,{
                    expiresIn:"7d",
                    secret:process.env.REFRESH_TOKEN_SECRET
                }),
                expiresIn:new Date().setTime(new Date().getTime()+expiresIn)

            }
        }

    }

    async validateUser(dto:LoginDTO){

        const user = await this.userService.findUserByEmail(dto.email);
        if(user && (await compare(dto.password,user.password))){
            const {password,...result} = user;
            return result;
        }

        throw new UnauthorizedException('Invalid credentials');        

    }

    async refreshToken(user:any){
        console.log("fired");
        const payload={
            user:user.user,
            sub:user.sub
        }

        return {
            accessToken:await this.JwtService.signAsync(payload,{
                expiresIn:"1d",
                secret:process.env.ACCESS_TOKEN_SECRET
            }),
            refreshToken:await this.JwtService.signAsync(payload,{
                expiresIn:"7d",
                secret:process.env.REFRESH_TOKEN_SECRET
            }),
            expiresIn:new Date().setTime(new Date().getTime()+expiresIn)
        }
    }


    async validateUserByJwt(payload:any){
     
       return await this.JwtService.verifyAsync(payload,{
            secret:process.env.ACCESS_TOKEN_SECRET
        });
       

    }
}
