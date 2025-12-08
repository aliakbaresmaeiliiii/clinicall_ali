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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, emailService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
    }
    async validateClinic(email, password) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { email },
        });
        if (!clinic) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!clinic.password) {
            throw new common_1.UnauthorizedException('Password not set');
        }
        const isPasswordValid = await bcrypt.compare(password, clinic.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!clinic.isVerified) {
            throw new common_1.BadRequestException('Email is not verified');
        }
        const { password: _, ...result } = clinic;
        return result;
    }
    async validateDoctor(email, password) {
        const doctor = await this.prisma.doctor.findUnique({
            where: { email },
        });
        if (!doctor) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!doctor.password) {
            throw new common_1.UnauthorizedException('Password not set');
        }
        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const { password: _, ...result } = doctor;
        return result;
    }
    async validatePatient(email, password) {
        const patient = await this.prisma.patient.findUnique({
            where: { email },
        });
        if (!patient) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!patient.isVerified) {
            throw new common_1.BadRequestException('Email is not verified');
        }
        if (!patient.password) {
            throw new common_1.BadRequestException('Password not set. Please set your password first.');
        }
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const { password: _, ...result } = patient;
        return result;
    }
    async login(user, userType) {
        const payload = {
            email: user.email,
            sub: user.id,
            userType: userType,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRED') || '1d',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRED') || '7d',
        });
        await this.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                userType: userType,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
            });
            const storedToken = await this.prisma.refreshToken.findUnique({
                where: { token: refreshToken },
            });
            if (!storedToken) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            if (storedToken.expiresAt < new Date()) {
                await this.prisma.refreshToken.delete({
                    where: { token: refreshToken },
                });
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            const newAccessToken = this.jwtService.sign({
                email: payload.email,
                sub: payload.sub,
                userType: payload.userType,
            }, {
                secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRED') || '1d',
            });
            return {
                access_token: newAccessToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(refreshToken) {
        await this.prisma.refreshToken.deleteMany({
            where: { token: refreshToken },
        });
        return { message: 'Logged out successfully' };
    }
    async registerClinic(registerClinicDto) {
        const { email, password, confirmPassword, name, owner_name, phone, address, city, state, zip_code, country, description, website } = registerClinicDto;
        const existingClinic = await this.prisma.clinic.findUnique({
            where: { email },
        });
        if (existingClinic) {
            throw new common_1.BadRequestException('Clinic with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = this.generateVerificationCode();
        let fullAddress = address;
        if (city || state || zip_code || country) {
            const addressParts = [];
            if (address)
                addressParts.push(address);
            if (city)
                addressParts.push(city);
            if (state)
                addressParts.push(state);
            if (zip_code)
                addressParts.push(zip_code);
            if (country)
                addressParts.push(country);
            fullAddress = addressParts.join(', ');
        }
        const clinicName = name || owner_name || 'Clinic';
        const clinic = await this.prisma.clinic.create({
            data: {
                email,
                password: hashedPassword,
                name: clinicName,
                phone,
                address: fullAddress,
                description,
                website,
                verifyCode,
            },
        });
        await this.emailService.sendVerificationEmail(email, verifyCode, clinicName);
        const { password: _, ...result } = clinic;
        return result;
    }
    async registerPatient(registerPatientDto) {
        const { email } = registerPatientDto;
        const existingPatient = await this.prisma.patient.findUnique({
            where: { email },
        });
        if (existingPatient) {
            throw new common_1.BadRequestException('Patient with this email already exists');
        }
        const verifyCode = this.generateVerificationCode();
        const patient = await this.prisma.patient.create({
            data: {
                email,
                verifyCode,
            },
        });
        await this.emailService.sendVerificationEmail(email, verifyCode);
        return patient;
    }
    async verifyClinicEmail(verifyEmailDto) {
        const { email, verifyCode } = verifyEmailDto;
        const clinic = await this.prisma.clinic.findUnique({
            where: { email },
        });
        if (!clinic) {
            throw new common_1.BadRequestException('Clinic not found');
        }
        if (clinic.verifyCode !== verifyCode) {
            throw new common_1.BadRequestException('Invalid verification code');
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
    async verifyPatientEmail(verifyEmailDto) {
        const { email, verifyCode } = verifyEmailDto;
        const patient = await this.prisma.patient.findUnique({
            where: { email },
        });
        if (!patient) {
            throw new common_1.BadRequestException('Patient not found');
        }
        if (patient.verifyCode !== verifyCode) {
            throw new common_1.BadRequestException('Invalid verification code');
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
    async updatePatientProfile(patientId, updatePatientProfileDto) {
        const { password, ...otherData } = updatePatientProfileDto;
        const updateData = { ...otherData };
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
    async getPatientProfile(patientId) {
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Patient not found');
        }
        const { password, verifyCode, ...result } = patient;
        return result;
    }
    async patientEmailSignIn(email) {
        const patient = await this.prisma.patient.findUnique({
            where: { email },
        });
        if (!patient) {
            throw new common_1.UnauthorizedException('Patient not found');
        }
        if (!patient.isVerified) {
            throw new common_1.BadRequestException('Email is not verified');
        }
        const { password: _, verifyCode: __, ...patientWithoutSensitiveData } = patient;
        return this.login(patientWithoutSensitiveData, 'patient');
    }
    generateVerificationCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map