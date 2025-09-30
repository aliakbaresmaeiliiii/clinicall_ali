"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const handlebars = __importStar(require("handlebars"));
const process_1 = require("process");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
            port: this.configService.get('SMTP_PORT', 587),
            secure: false,
            auth: {
                user: this.configService.get('MAIL_USERNAME'),
                pass: this.configService.get('MAIL_PASSWORD'),
            },
        });
    }
    async sendVerificationEmail(email, verifyCode, fullName) {
        try {
            const templateName = fullName ? 'register.html' : 'verify-email.html';
            const templatePath = path.join(process.cwd(), 'public', 'template', 'email', templateName);
            const templateContent = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateContent);
            const templateData = {
                APP_NAME: 'Clinical Ali',
                fullName: fullName || 'User',
                TOKEN: verifyCode,
                urlToken: `${this.configService.get(process_1.env.FRONTEND_URL, 'http://localhost:8080')}/verify-email?code=${verifyCode}&email=${email}`,
            };
            const htmlContent = template(templateData);
            const mailOptions = {
                from: this.configService.get(process_1.env.SMTP_FROM, 'noreply@clinicalali.com'),
                to: email,
                subject: 'Verify Your Email - Clinical Ali',
                html: htmlContent,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Verification email sent:', result.messageId);
            console.log('result', result);
            return result;
        }
        catch (error) {
            console.error('Error sending verification email:', error);
            throw error;
        }
    }
    async sendPasswordResetEmail(email, resetToken, fullName) {
        try {
            const templatePath = path.join(process.cwd(), 'public', 'template', 'reset-password.html');
            const templateContent = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateContent);
            const templateData = {
                userName: fullName || 'User',
                resetLink: `${this.configService.get(process_1.env.FRONTEND_URL, 'http://localhost:8080')}/reset-password?token=${resetToken}`,
            };
            const htmlContent = template(templateData);
            const mailOptions = {
                from: this.configService.get(process_1.env.SMTP_FROM, 'noreply@clinicalali.com'),
                to: email,
                subject: 'Reset Your Password - Clinical Ali',
                html: htmlContent,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Password reset email sent:', result.messageId);
            console.log('result', result);
            return result;
        }
        catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map