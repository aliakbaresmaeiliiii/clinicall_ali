import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import {EmailProvider} from "../config/email";
import { readHTMLFile } from "../helper/file";
import {ResponseError} from "../modules/error/response_error";
import { User } from "../types/user";
const { APP_NAME } = process.env;
import nodemailer from "nodemailer";

export class SendEmail {
  public static AccountRegister(formData: any) {
    const { email } = formData;
    const TOKEN = formData.verify_code;
    const pathTemplate = path.resolve(
      __dirname,
      `../../public/template/email/emailverify.html`
    );

    const subject = "Clinic Registeration";
    // const urlToken = `${BASE_URL_CLIENT}/email/verify?token=${token}`
    const dataTemplate = { APP_NAME, TOKEN };
    const Email = new EmailProvider();

    readHTMLFile(pathTemplate, (error: Error, html: any) => {
      if (error) {
        throw new ResponseError.NotFound("email template not found");
      }

      const template = handlebars.compile(html);
      const htmlToSend = template(dataTemplate);

      Email.send(email, subject, htmlToSend);
    });
  }

  public static forgetPassToken(formData: User, token: string) {
    const { email } = formData;
    const TOKEN = token;
    const pathTemplate = path.resolve(
      __dirname,
      `../public/template/email/reset-password.html`
    );

    const subject = "Alishopeee Registeration";
    // const urlToken = `${BASE_URL_CLIENT}/email/verify?token=${token}`
    const dataTemplate = { APP_NAME, TOKEN };
    const Email = new EmailProvider();

    readHTMLFile(pathTemplate, (error: Error, html: any) => {
      if (error) {
        throw new ResponseError.NotFound("email template not found");
      }

      const template = handlebars.compile(html);
      const htmlToSend = template(dataTemplate);
      Email.send(email, subject, htmlToSend);
    });
  }

  public static sendResetPasswordEmail = async (
    email: string,
    userName: string,
    resetLink: string
  ) => {
    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      "templates",
      "../public/template/email/reset-password.html"
    );
    const template = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders with actual values
    const htmlContent = template
      .replace("{{userName}}", userName)
      .replace(/{{resetLink}}/g, resetLink);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "aliakbaresmaeili98@gmail.com", // your SMTP username
        pass: "cgop ttip zuqz hqlr", // your SMTP password
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: '"Your Company" <no-reply@yourcompany.com>',
      to: email,
      subject: "Reset Your Password",
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
  };
}

