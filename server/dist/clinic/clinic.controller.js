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
exports.ClinicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clinic_service_1 = require("./clinic.service");
const create_clinic_dto_1 = require("./dto/create-clinic.dto");
const update_clinic_dto_1 = require("./dto/update-clinic.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ClinicController = class ClinicController {
    constructor(clinicService) {
        this.clinicService = clinicService;
    }
    create(createClinicDto) {
        return this.clinicService.create(createClinicDto);
    }
    findAll() {
        return this.clinicService.findAll();
    }
    findOne(id) {
        return this.clinicService.findOne(+id);
    }
    update(id, updateClinicDto) {
        return this.clinicService.update(+id, updateClinicDto);
    }
    remove(id) {
        return this.clinicService.remove(+id);
    }
};
exports.ClinicController = ClinicController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new clinic' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Clinic created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clinic_dto_1.CreateClinicDto]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all clinics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of clinics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get clinic by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Clinic details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Clinic not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update clinic' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Clinic updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Clinic not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clinic_dto_1.UpdateClinicDto]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete clinic' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Clinic deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Clinic not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "remove", null);
exports.ClinicController = ClinicController = __decorate([
    (0, swagger_1.ApiTags)('Clinics'),
    (0, common_1.Controller)('clinics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [clinic_service_1.ClinicService])
], ClinicController);
//# sourceMappingURL=clinic.controller.js.map