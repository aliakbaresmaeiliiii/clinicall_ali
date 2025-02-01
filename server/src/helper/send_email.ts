import handlebars from "handlebars";
import path from "path";
import { EmailProvider } from "../config/email";
import { ResponseError } from "../modules/error/response_error";
import { User } from "../types/user";
import { readHTMLFile } from "./file";
import fs from 'fs/promises';


const { APP_NAME } = process.env;

class SendMail {
  private static emailProvider = new EmailProvider();
  
  public static async AccountRegister(formData: any) {
    try {
      const { email, verify_code: TOKEN } = formData;
      const subject = 'Ali Doctor Registration';
      const templatePath = path.resolve(__dirname, '../../public/template/email/emailverify.html');

      // Read email template using async/await
      const html = await fs.readFile(templatePath, 'utf8');
      const template = handlebars.compile(html);
      const htmlToSend = template({ APP_NAME, TOKEN });

      // Send email
      await this.emailProvider.send(email, subject, htmlToSend);
    } catch (error) {
      console.error('Error in AccountRegister:', error);
      throw new ResponseError.NotFound('Email template not found');
    }

    // const { email } = formData
    // const TOKEN = formData.verify_code
    // const pathTemplate = path.resolve(
    //   __dirname,
    //   `../../public/template/email/emailverify.html`
    // )

    // const subject = 'Ali Doctor Registration'
    // // const urlToken = `${BASE_URL_CLIENT}/email/verify?token=${token}`
    // const dataTemplate = { APP_NAME, TOKEN }
    // const Email = new EmailProvider()

    // readHTMLFile(pathTemplate, (error: Error, html: any) => {
    //   if (error) {
    //     throw new ResponseError.NotFound('email template not found')
    //   }

    //   const template = handlebars.compile(html)
    //   const htmlToSend = template(dataTemplate)

    //   Email.send(email, subject, htmlToSend)
    // })
  }

  public static forgetPassToken(formData: User, token: string) {
    const { email } = formData;
    const TOKEN = token;
    const pathTemplate = path.resolve(
      __dirname,
      `../../public/templates/emails/register.html`
    );

    const subject = "Yours Doctor Registeration";
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
}

export default SendMail;
