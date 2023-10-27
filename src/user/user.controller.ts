import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guard/jtw.guard';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @UseGuards(JWTGuard)
    @Get(":id")
    async getUser(@Param("id") id:string){
        return this.userService.findUserById(id);
    }
 
}
