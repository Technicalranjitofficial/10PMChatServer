import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUserDto, emailVerifyDTO } from './dto/user.dto';
import { PrismaService } from 'src/prisma.service';
import {hash} from "bcrypt"
import { generateEmailVerificationToken, validateEmailOtp } from 'src/utils/User.util';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService,private readonly jwtService:JwtService,private readonly emailService:MailService){};

    async createUser(dto:createUserDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        });

        if(user) throw new ConflictException('Email already exists');

        const {token,otp} = await generateEmailVerificationToken(dto,this.jwtService);
      await this.emailService.sendOtpVerificationEmail(dto.email,otp.toString(),dto.name,`${process.env.HOST_URL}/verify?otpMode=false&&token=${token}&&otp=${otp}}`);



        return {
            token:token,
            otp:otp,
            message:"Email verification token sent to your email",
            statusCode:201,
        };

        // verify email
      

            // const newUser = await this.prisma.user.create({
            //     data:{
            //         ...user,
            //         password:await hash(user.password,10)
            //     }
            // });

            // if(!newUser) throw new InternalServerErrorException('Something went wrong');
            // const {password,...result}  = newUser;

            // return result;
        }



        // const newUser = await this.prisma.user.create({
        //     data:{
        //         ...dto,
        //         password:await hash(dto.password,10)
        //     }
        // });

        // if(!newUser) throw new InternalServerErrorException('Something went wrong');
        // const {password,...result}  = newUser;

        // return result;
        async verifyEmail(dto:emailVerifyDTO){
           
            const user = await validateEmailOtp(dto,this.jwtService);
            console.log(user);
            if(user instanceof UnauthorizedException) return user;
            const checkUserExist = await this.findUserByEmail(user.email);
            if(checkUserExist) return new ConflictException("User Alrady Verified");
            if(user){
                const createUser = await this.prisma.user.create({
                    data:{
                    ...user,
                    password:await hash(user.password,10)
                    }
                });
                const {password,...result} = createUser;

                await this.emailService.sendAccountCreated(user.email,user.name);
            

                return {
                    statusCode:201,
                    message:"User created successfully",
                    data:result
                }
            }
          
         

    

    



        // async setNewPass(dto:){
           
        //     const user = await validateEmailOtp(dto,this.jwtService);
        //     console.log(user);
        //     if(user instanceof UnauthorizedException) return user;
        //     const checkUserExist = await this.findUserByEmail(user.email);
        //     if(checkUserExist) return new ConflictException("User Alrady Verified");
        //     if(user){
        //         const createUser = await this.prisma.user.create({
        //             data:{
        //             ...user,
        //             password:await hash(user.password,10)
        //             }
        //         });
        //         const {password,...result} = createUser;

        //         return {
        //             statusCode:201,
        //             message:"User created successfully",
        //             data:result
        //         }
        //     }
          
         

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



    async updateUserPassword(id:string,pass:string){

        const user = await this.prisma.user.update({
            where:{
                id:id
            },
            data:{
                password:await hash(pass,10)
            }
        });

        if(!user) throw new NotFoundException('User not found');
        const {password,...result} = user;
        return result;
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
