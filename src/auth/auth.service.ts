import { HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO, SendResetPasswordDTO, SetNewPasswordDTO } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { MyMailService } from 'src/mail.service';
import { VerifyTokenDTO, emailVerifyDTO } from 'src/user/dto/user.dto';
import { validateToken } from 'src/utils/User.util';

const expiresIn =60* 60 * 1000 * 24;

@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService,private JwtService:JwtService,private readonly mailService:MyMailService){}

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


    async SendResetPassword(dto:SendResetPasswordDTO){
        const user = await this.userService.findUserByEmail(dto.email);
        if(!user) throw new NotFoundException("User Not Found");
        const payload = {
            user,
            sub:{
                name:user.name,
            }
        }

        
          const token = await this.JwtService.signAsync(payload,{
            expiresIn:"30min",
            secret:process.env.RESET_PASSWORD_TOKEN_SECRET
        });
        console.log(token);

        if(!token) throw new InternalServerErrorException("Something went wrong");

        await this.mailService.sendPassReset(dto.email,`${process.env.HOST_URL}/reset/${token}`,user.name);

        return {
            message:"Password Reset Link Sent to your email",
            statusCode:200,
            token:token
        }

    }


    async verifyResetPasswordRequest(token:VerifyTokenDTO){

        const tokenValidate = await validateToken(token,this.JwtService);
      
            return {
                statusCode:200,
                message:"Validated Successfully",
                tokenValidate
            }


    }


    async setNewPassword(dto:SetNewPasswordDTO){
        const user = await validateToken(dto,this.JwtService);
        const createNewPassword = await this.userService.updateUserPassword(user.id,dto.password);
        await this.mailService.passwordChanged(user.email,user.name);
        return {
            statusCode:200,
            message:"Password has been changed."
        }
    }



}
