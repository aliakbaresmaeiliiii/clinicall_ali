"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const register_clinic_dto_1 = require("./dto/register-clinic.dto");
const register_patient_dto_1 = require("./dto/register-patient.dto");
const verify_email_dto_1 = require("./dto/verify-email.dto");
const update_patient_profile_dto_1 = require("./dto/update-patient-profile.dto");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const patient_email_sign_in_dto_1 = require("./dto/patient-email-sign-in.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerClinic(registerClinicDto) {
        const result = await this.authService.registerClinic(registerClinicDto);
        return {
            statusCode: 201,
            message: 'Clinic registered successfully',
            data: result
        };
    }
    async registerPatient(registerPatientDto) {
        const result = await this.authService.registerPatient(registerPatientDto);
        return {
            statusCode: 201,
            message: 'Patient registered successfully',
            data: result
        };
    }
    async verifyClinicEmail(verifyEmailDto) {
        return this.authService.verifyClinicEmail(verifyEmailDto);
    }
    async verifyPatientEmail(verifyEmailDto) {
        return this.authService.verifyPatientEmail(verifyEmailDto);
    }
    async clinicSignIn(req) {
        const result = await this.authService.login(req.user, 'clinic');
        return {
            statusCode: 200,
            message: 'Login successful',
            data: result
        };
    }
    async doctorSignIn(req) {
        const result = await this.authService.login(req.user, 'doctor');
        return {
            statusCode: 200,
            message: 'Login successful',
            data: result
        };
    }
    async patientSignIn(patientEmailSignInDto) {
        const result = await this.authService.patientEmailSignIn(patientEmailSignInDto.email);
        return {
            statusCode: 200,
            message: 'Login successful',
            data: result
        };
    }
    async refreshToken(body) {
        const result = await this.authService.refreshToken(body.refresh_token);
        return {
            statusCode: 200,
            message: 'Token refreshed successfully',
            data: result
        };
    }
    async logout(body) {
        const result = await this.authService.logout(body.refresh_token);
        return {
            statusCode: 200,
            message: 'Logged out successfully',
            data: result
        };
    }
    async getPatientProfile(patientId) {
        return this.authService.getPatientProfile(patientId);
    }
    async updatePatientProfile(patientId, updatePatientProfileDto) {
        return this.authService.updatePatientProfile(patientId, updatePatientProfileDto);
    }
    async verifyRecaptcha(body) {
        return { success: true };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('clinic/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new clinic' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Clinic registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_clinic_dto_1.RegisterClinicDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerClinic", null);
__decorate([
    (0, common_1.Post)('patient/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new patient' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Patient registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_patient_dto_1.RegisterPatientDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerPatient", null);
__decorate([
    (0, common_1.Post)('verify-clinic-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify clinic email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Clinic not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyClinicEmail", null);
__decorate([
    (0, common_1.Post)('verify-patient-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify patient email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyPatientEmail", null);
__decorate([
    (0, common_1.Post)('clinic-sign-in'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in as clinic' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "clinicSignIn", null);
__decorate([
    (0, common_1.Post)('doctor-sign-in'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in as doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "doctorSignIn", null);
__decorate([
    (0, common_1.Post)('patient-sign-in'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in as patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_email_sign_in_dto_1.PatientEmailSignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "patientSignIn", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token refreshed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logged out successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('patient/profile/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPatientProfile", null);
__decorate([
    (0, common_1.Put)('patient/profile/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update patient profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_patient_profile_dto_1.UpdatePatientProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePatientProfile", null);
__decorate([
    (0, common_1.Post)('verify-recaptcha'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify reCAPTCHA token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'reCAPTCHA verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyRecaptcha", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map