// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail' for Gmail
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendOtpVerificationEmail(to: string, otpCode: string,username:string,verifyLink:string) {
    const templatePath = path.join(__dirname,'../src/template/otp-verification.ejs'); // Update the path to your EJS template

    ejs.renderFile(templatePath, { otpCode,username,verifyLink },async(error:any, html:any) => {
      if (error) {
        console.error('Error rendering EJS template:', error);
        return;
      }

      const mailOptions = {
        from: 'MeetStranger<mail.server.hib@gmail.com>',
        to,
        subject: 'OTP Verification',
        html, // Use the rendered HTML content
      };

      await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
        if (err) {
          console.error('Error sending email:', err);
        } else {
          console.log('Email sent successfully');
        }
      });
    });

}
    async sendPassReset(to: string, resetLink:string,username:string) {
        const templatePath = path.join(__dirname,'../src/template/reset-password.ejs'); // Update the path to your EJS template
    
        ejs.renderFile(templatePath, { resetLink,username }, async(error:any, html:any) => {
          if (error) {
            console.error('Error rendering EJS template:', error);
            return;
          }
    
          const mailOptions = {
            from: 'MeetStranger<mail.server.hib@gmail.com>',
            to,
            subject: 'Password Reset',
            html, // Use the rendered HTML content
          };
    
         await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
            if (err) {
              console.error('Error sending email:', err);
            } else {
              console.log('Email sent successfully');
            }
          });
        });
  }

  async sendAccountCreated(to: string,username:string) {
    const templatePath = path.join(__dirname,'../src/template/account-created.ejs'); // Update the path to your EJS template

    ejs.renderFile(templatePath, { username }, async(error:any, html:any) => {
      if (error) {
        console.error('Error rendering EJS template:', error);
        return;
      }

      const mailOptions = {
        from: 'MeetStranger<mail.server.hib@gmail.com>',
        to,
        subject: 'Account Created!',
        html, // Use the rendered HTML content
      };

     await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
        if (err) {
          console.error('Error sending email:', err);
        } else {
          console.log('Email sent successfully');
        }
      });
    });
}


async passwordChanged(to: string,username:string) {
  const templatePath = path.join(__dirname,'../src/template/password-changed.ejs'); // Update the path to your EJS template

  ejs.renderFile(templatePath, { username }, async(error:any, html:any) => {
    if (error) {
      console.error('Error rendering EJS template:', error);
      return;
    }

    const mailOptions = {
      from: 'MeetStranger<mail.server.hib@gmail.com>',
      to,
      subject: 'Password Changed!',
      html, // Use the rendered HTML content
    };

   await this.transporter.sendMail(mailOptions, (err:any, info:any) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent successfully');
      }
    });
  });
}
}
