// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';



@Injectable()
export class MyMailService {

  constructor(private readonly mailService:MailerService){}


  async sendEmail() {
    await this.mailService.sendMail({
      to: 'technicalranjit@gmail.com',
      subject: 'Hello',
      text: 'This is a simple email without a template.',
      template:"ram"
    });
  }





//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'Gmail', // e.g., 'Gmail' for Gmail
//       auth: {
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//       },
//     });
//   }

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
      console.log("Eail Has been Sent",d);
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
  }).then(()=>{
    console.log("Eail Has been Sent");
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




//     async sendPassReset(to: string, resetLink:string,username:string) {
//         const templatePath = path.join(__dirname,'../src/template/reset-password.ejs'); // Update the path to your EJS template
    
//         ejs.renderFile(templatePath, { resetLink,username }, async(error:any, html:any) => {
//           if (error) {
//             console.error('Error rendering EJS template:', error);
//             return;
//           }
    
//           const mailOptions = {
//             from: 'Matcher<mail.server.hib@gmail.com>',
//             to,
//             subject: 'Password Reset',
//             html, // Use the rendered HTML content
//           };
    
//          await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
//             if (err) {
//               console.error('Error sending email:', err);
//             } else {
//               console.log('Email sent successfully');
//             }
//           });
//         });
//   }

//   async sendAccountCreated(to: string,username:string) {
//     const templatePath = path.join(__dirname,'../src/template/account-created.ejs'); // Update the path to your EJS template

//     ejs.renderFile(templatePath, { username }, async(error:any, html:any) => {
//       if (error) {
//         console.error('Error rendering EJS template:', error);
//         return;
//       }

//       const mailOptions = {
//         from: 'Matcher<mail.server.hib@gmail.com>',
//         to,
//         subject: 'Account Created!',
//         html, // Use the rendered HTML content
//       };

//      await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
//         if (err) {
//           console.error('Error sending email:', err);
//         } else {
//           console.log('Email sent successfully');
//         }
//       });
//     });
// }


// async passwordChanged(to: string,username:string) {
//   const templatePath = path.join(__dirname,'../src/template/password-changed.ejs'); // Update the path to your EJS template

//   ejs.renderFile(templatePath, { username }, async(error:any, html:any) => {
//     if (error) {
//       console.error('Error rendering EJS template:', error);
//       return;
//     }

//     const mailOptions = {
//       from: 'Matcher<mail.server.hib@gmail.com>',
//       to,
//       subject: 'Password Changed!',
//       html, // Use the rendered HTML content
//     };

//    await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
//       if (err) {
//         console.error('Error sending email:', err);
//       } else {
//         console.log('Email sent successfully');
//       }
//     });
//   });
// }
}
