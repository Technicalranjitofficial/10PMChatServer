import { IsEmail, IsNumber, IsString } from "class-validator";
import exp from "constants";

export class createUserDto{
    @IsString()
    name:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}

export class emailVerifyDTO{
    @IsString()
    token:string;

    @IsNumber()
    otp:number;
}

export class VerifyTokenDTO{
    @IsString()
    token:string;

   
}

export class ResetPasswordDTO{
    @IsString()
    token:string;

    @IsString()
    password:string;
}