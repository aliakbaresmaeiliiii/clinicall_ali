import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async validateClinic(email: string, password: string): Promise<any> {
    const clinic = await this.prisma.clinic.findUnique({
      where: { email },
    });

    if (!clinic) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!clinic.password) {
      throw new UnauthorizedException('Password not set');
    }

    const isPasswordValid = await bcrypt.compare(password, clinic.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!clinic.isVerified) {
      throw new BadRequestException('Email is not verified');
    }

    const { password: _, ...result } = clinic;
    return result;
  }

  async validateDoctor(email: string, password: string): Promise<any> {
    const doctor = await this.prisma.doctor.findUnique({
      where: { email },
    });

    if (!doctor) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!doctor.password) {
      throw new UnauthorizedException('Password not set');
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...result } = doctor;
    return result;
  }

  async validatePatient(email: string, password: string): Promise<any> {
    const patient = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if patient is verified
    if (!patient.isVerified) {
      throw new BadRequestException('Email is not verified');
    }

    // Check if password is set
    if (!patient.password) {
      throw new BadRequestException(
        'Password not set. Please set your password first.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...result } = patient;
    return result;
  }

  async login(user: any, userType: string) {
    const payload = {
      email: user.email,
      sub: user.id,
      userType: userType,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_ACCESS_TOKEN'),
      expiresIn:
        this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED') || '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN'),
      expiresIn:
        this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRED') || '7d',
    });

    // Store refresh token in database
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        userType: userType,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        userType: userType,
        isVerified: user.isVerified,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN'),
      });

      // Check if refresh token exists in database
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!storedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if token is expired
      if (storedToken.expiresAt < new Date()) {
        await this.prisma.refreshToken.delete({
          where: { token: refreshToken },
        });
        throw new UnauthorizedException('Refresh token expired');
      }

      // Generate new access token
      const newAccessToken = this.jwtService.sign(
        {
          email: payload.email,
          sub: payload.sub,
          userType: payload.userType,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET_ACCESS_TOKEN'),
          expiresIn:
            this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED') || '1d',
        },
      );

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string) {
    // Delete the refresh token from database
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });

    return { message: 'Logged out successfully' };
  }

  async registerClinic(registerClinicDto: RegisterClinicDto) {
    const { email, password, name, phone, address } = registerClinicDto;

    // Check if clinic already exists
    const existingClinic = await this.prisma.clinic.findUnique({
      where: { email },
    });

    if (existingClinic) {
      throw new BadRequestException('Clinic with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code - 4 characters with numbers and letters
    const verifyCode = this.generateVerificationCode();

    const clinic = await this.prisma.clinic.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        address,
        verifyCode,
      },
    });

    // Send verification email
    await this.emailService.sendVerificationEmail(email, verifyCode, name);

    const { password: _, ...result } = clinic;
    return result;
  }

  async registerPatient(registerPatientDto: RegisterPatientDto) {
    const { email } = registerPatientDto;

    // Check if patient already exists
    const existingPatient = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (existingPatient) {
      throw new BadRequestException('Patient with this email already exists');
    }

    // Generate verification code - 4 characters with numbers and letters
    const verifyCode = this.generateVerificationCode();

    const patient = await this.prisma.patient.create({
      data: {
        email,
        verifyCode,
      },
    });

    // Send verification email
    await this.emailService.sendVerificationEmail(email, verifyCode);

    return patient;
  }

  async verifyClinicEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, verifyCode } = verifyEmailDto;

    const clinic = await this.prisma.clinic.findUnique({
      where: { email },
    });

    if (!clinic) {
      throw new BadRequestException('Clinic not found');
    }

    if (clinic.verifyCode !== verifyCode) {
      throw new BadRequestException('Invalid verification code');
    }

    const updatedClinic = await this.prisma.clinic.update({
      where: { email },
      data: {
        isVerified: true,
        verifyCode: null,
      },
    });

    const { password: _, ...result } = updatedClinic;
    return result;
  }

  async verifyPatientEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, verifyCode } = verifyEmailDto;

    const patient = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      throw new BadRequestException('Patient not found');
    }

    if (patient.verifyCode !== verifyCode) {
      throw new BadRequestException('Invalid verification code');
    }

    const updatedPatient = await this.prisma.patient.update({
      where: { email },
      data: {
        isVerified: true,
        verifyCode: null,
      },
    });

    return updatedPatient;
  }

  async updatePatientProfile(
    patientId: number,
    updatePatientProfileDto: UpdatePatientProfileDto,
  ) {
    const { password, ...otherData } = updatePatientProfileDto;

    const updateData: any = { ...otherData };

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedPatient = await this.prisma.patient.update({
      where: { id: patientId },
      data: updateData,
    });

    const { password: _, ...result } = updatedPatient;
    return result;
  }

  async getPatientProfile(patientId: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const { password, verifyCode, ...result } = patient;
    return result;
  }

  async patientEmailSignIn(email: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      throw new UnauthorizedException('Patient not found');
    }

    // Check if patient is verified
    if (!patient.isVerified) {
      throw new BadRequestException('Email is not verified');
    }

    // For email-only sign-in, we don't check password
    const {
      password: _,
      verifyCode: __,
      ...patientWithoutSensitiveData
    } = patient;

    return this.login(patientWithoutSensitiveData, 'patient');
  }

  private generateVerificationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
