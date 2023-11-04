import { Body, Controller, Post, Request, Res, Response, UseGuards } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/auth.dto';
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

    @Post('login')
    async login(@Body() dto:LoginDTO,@Res() Response){
        return Response.status(200).send(await this.AuthService.login(dto));
    }

    @UseGuards(RefreshGuard)
    @Post("refresh")
    async refreshToken(@Request() request){
      return this.AuthService.refreshToken(request.user);
    }
}
