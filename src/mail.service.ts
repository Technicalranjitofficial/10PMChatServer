// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';



@Injectable()
export class MyMailService {
  constructor(private readonly mailService:MailerService){
    
  }

  async sendOtpVerificationEmail(to: string, otpCode: string,username:string,verifyLink:string) {
  
    const data = {
      username: username,
      otpCode: otpCode,
      verifyLink: verifyLink,
    };

    console.log(data);
    await this.mailService.sendMail({
      to: to,
      subject: 'Otp Verification',
      template: 'otp-verification', // Name of your template file without extension
      context: data,
    }).then((d)=>{
      console.log("Email Has been Sent",d);
    }).catch((err)=>{
      console.log(err);
    });



    



}

async sendPassReset(to: string, resetLink:string,username:string) {
 
  await this.mailService.sendMail({
    to: to,
    subject: 'Password Reset',
    template: 'reset-password', // Name of your template file without extension
    context: {
     username:username,
     resetLink:resetLink
    },
  }).then((d)=>{
    console.log("Eail Has been Sent",d);
  }).catch((err)=>{
    console.log(err);
  });
      
}

async sendAccountCreated(to: string,username:string) {
  await this.mailService.sendMail({
    to: to,
    subject: 'Account Created!',
    template: 'account-created', // Name of your template file without extension
    context: {
     username:username,
   
    },
  }).then(()=>{
    console.log("Eail Has been Sent");
  }).catch((err)=>{
    console.log(err);
  });


}


async passwordChanged(to: string,username:string) {
  await this.mailService.sendMail({
    to: to,
    subject: 'Password Changed!',
    template: 'password-changed', // Name of your template file without extension
    context: {
     username:username,
   
    },
  }).then(()=>{
    console.log("Eail Has been Sent");
  }).catch((err)=>{
    console.log(err);
  });
}


}