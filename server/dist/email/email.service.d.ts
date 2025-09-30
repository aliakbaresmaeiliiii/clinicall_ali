import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendVerificationEmail(email: string, verifyCode: string, fullName?: string): Promise<any>;
    sendPasswordResetEmail(email: string, resetToken: string, fullName?: string): Promise<any>;
}
