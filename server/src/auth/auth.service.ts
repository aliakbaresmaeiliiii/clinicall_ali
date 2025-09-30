import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateClinic(email: string, password: string): Promise<any> {
    const clinic = await this.prisma.clinic.findUnique({
      where: { email },
    });

    if (!clinic) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, clinic.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!clinic.isVerified) {
      throw new BadRequestException('Email is not confirmed');
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
      userType: userType 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        userType: userType,
      },
    };
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
    
    // Generate verification code
    const verifyCode = Math.random().toString(36).substring(2, 8).toUpperCase();

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

    // Generate verification code
    const verifyCode = Math.random().toString(36).substring(2, 8).toUpperCase();

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
        verifyCode: null,
      },
    });

    const { password: _, ...result } = updatedPatient;
    return result;
  }
}
