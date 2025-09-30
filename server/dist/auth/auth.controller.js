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
const local_auth_guard_1 = require("./guards/local-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerClinic(registerClinicDto) {
        return this.authService.registerClinic(registerClinicDto);
    }
    async registerPatient(registerPatientDto) {
        return this.authService.registerPatient(registerPatientDto);
    }
    async verifyClinicEmail(verifyEmailDto) {
        return this.authService.verifyClinicEmail(verifyEmailDto);
    }
    async verifyPatientEmail(verifyEmailDto) {
        return this.authService.verifyPatientEmail(verifyEmailDto);
    }
    async clinicSignIn(req) {
        return this.authService.login(req.user, 'clinic');
    }
    async doctorSignIn(req) {
        return this.authService.login(req.user, 'doctor');
    }
    async patientSignIn(req) {
        return this.authService.login(req.user, 'patient');
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
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in as patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "patientSignIn", null);
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