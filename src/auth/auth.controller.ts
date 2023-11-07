import { Body, Controller, HttpException, Post, Request, Res, Response, UseGuards } from '@nestjs/common';
import { ResetPasswordDTO, VerifyTokenDTO, createUserDto, emailVerifyDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO, SendResetPasswordDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guard/refresh.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly userService:UserService,private readonly AuthService:AuthService){

    }

    // @Post('signup')
    @Post("signup")
    async createUser(@Body() dto:createUserDto){
        console.log(dto);
        return this.userService.createUser(dto);
    }

    @Post("verify")
    async verifyUser(@Body() dto:emailVerifyDTO){
        console.log(dto);
        return await this.userService.verifyEmail(dto);
    }

    @Post('login')
    async login(@Body() dto:LoginDTO,@Res() Response){
        return Response.status(200).send(await this.AuthService.login(dto));
    }

    @UseGuards(RefreshGuard)
    @Post("refresh")
    async refreshToken(@Request() request){
      return this.AuthService.refreshToken(request.user);
    }

    @Post("reset-request")
    async sendResetPasswordEmail(@Body() dto:SendResetPasswordDTO,@Res() Response){
        console.log("here is your code",dto);
        // return {message:"Email sent"};
        return Response.status(200).send(await this.AuthService.SendResetPassword(dto));
    }
    @Post("reset-validate")
    async validateResetToken(@Body() dto:VerifyTokenDTO,@Res() Response){
        return Response.status(200).send(await this.AuthService.verifyResetPasswordRequest(dto));
    }

    @Post("set-new-password")
    async setNewPassword(@Body() dto:ResetPasswordDTO,@Res() Response){
        return Response.status(200).send(await this.AuthService.setNewPassword(dto));
    }
}

