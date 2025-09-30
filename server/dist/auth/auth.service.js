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
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(prisma, jwtService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async validateClinic(email, password) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { email },
        });
        if (!clinic) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, clinic.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!clinic.isVerified) {
            throw new common_1.BadRequestException('Email is not confirmed');
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
    async registerClinic(registerClinicDto) {
        const { email, password, name, phone, address } = registerClinicDto;
        const existingClinic = await this.prisma.clinic.findUnique({
            where: { email },
        });
        if (existingClinic) {
            throw new common_1.BadRequestException('Clinic with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
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
        await this.emailService.sendVerificationEmail(email, verifyCode, name);
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
        const verifyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
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
                verifyCode: null,
            },
        });
        const { password: _, ...result } = updatedPatient;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map