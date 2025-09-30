import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { env } from 'process';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get('SMTP_PORT', 587),
      secure: false, // true for 465, false for other ports
      auth: {

        user: this.configService.get('MAIL_USERNAME'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(email: string, verifyCode: string, fullName?: string) {
    try {
      // Use different templates based on whether we have a name
      const templateName = fullName ? 'register.html' : 'verify-email.html';
      const templatePath = path.join(process.cwd(), 'public', 'template', 'email', templateName);
      const templateContent = fs.readFileSync(templatePath, 'utf8');

      // Compile the template
      const template = handlebars.compile(templateContent);

      // Prepare template data
      const templateData = {
        APP_NAME: 'Clinical Ali',
        fullName: fullName || 'User',
        TOKEN: verifyCode,
        urlToken: `${this.configService.get(env.FRONTEND_URL, 'http://localhost:8080')}/verify-email?code=${verifyCode}&email=${email}`,
      };

      // Generate HTML content
      const htmlContent = template(templateData);

      // Send email
      const mailOptions = {
        from: this.configService.get(env.SMTP_FROM, 'noreply@clinicalali.com'),
        to: email,
        subject: 'Verify Your Email - Clinical Ali',
        html: htmlContent,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent:', result.messageId);
      console.log('result', result);
      return result;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string, fullName?: string) {
    try {
      // Read the reset password template
      const templatePath = path.join(process.cwd(), 'public', 'template', 'reset-password.html');
      const templateContent = fs.readFileSync(templatePath, 'utf8');

      // Compile the template
      const template = handlebars.compile(templateContent);

      // Prepare template data
      const templateData = {
        userName: fullName || 'User',
        resetLink: `${this.configService.get(env.FRONTEND_URL, 'http://localhost:8080')}/reset-password?token=${resetToken}`,
      };

      // Generate HTML content
      const htmlContent = template(templateData);

      // Send email
      const mailOptions = {
        from: this.configService.get(env.SMTP_FROM, 'noreply@clinicalali.com'),
        to: email,
        subject: 'Reset Your Password - Clinical Ali',
        html: htmlContent,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', result.messageId);
      console.log('result', result);
      return result;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
}
