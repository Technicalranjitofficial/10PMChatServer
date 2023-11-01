import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma.service';

import {hash} from "bcrypt"
import { NotFoundError } from 'rxjs';
import { SocketUserDTO } from './dto/SocketUser.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){};

    async createUser(dto:createUserDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        });

        if(user) throw new ConflictException('Email already exists');
        const newUser = await this.prisma.user.create({
            data:{
                ...dto,
                password:await hash(dto.password,10)
            }
        });

        if(!newUser) throw new InternalServerErrorException('Something went wrong');
        const {password,...result}  = newUser;

        return result;
    }


    //find user by email

    async findUserByEmail(email:string){
        return await this.prisma.user.findUnique({where:{email:email}});
    }

    //findUser by id 

    async findUserById(id:string){
        const user = await this.prisma.user.findUnique({where:{id:id}});
        if(!user) throw new NotFoundException('User not found');
        const {password,...result} = user;
        return result;
    }
    

    async getAllUser(){
        return await this.prisma.user.findMany({});
    }

    //update user is online status
    // async updateUserStatus(socketId:string,user:Map<string,SocketUserDTO>,roomId:string){

    //     const getUser = user.get(socketId);
    //     if(!getUser) return;
    //     getUser.isAvailable = false;
    //     getUser.roomId=roomId
    //     user.set(socketId,getUser);
      
    // }

   


}
