import { IsEmail, IsString } from "class-validator";

export class LoginDTO{
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}

export class SendResetPasswordDTO{
    @IsString()
    @IsEmail()
    email:string;
}

export class SetNewPasswordDTO{
    @IsString()
    token:string;

    @IsString()
    password:string;
}