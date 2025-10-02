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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctor_service_1 = require("./doctor.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const update_doctor_dto_1 = require("./dto/update-doctor.dto");
const search_doctor_dto_1 = require("./dto/search-doctor.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    create(createDoctorDto) {
        return this.doctorService.create(createDoctorDto);
    }
    findAll(searchDto) {
        const hasSearchParams = Object.values(searchDto).some(value => value !== undefined && value !== null && value !== '');
        if (hasSearchParams) {
            return this.doctorService.search(searchDto);
        }
        return this.doctorService.findAll();
    }
    findOne(id) {
        return this.doctorService.findOne(+id);
    }
    update(id, updateDoctorDto) {
        return this.doctorService.update(+id, updateDoctorDto);
    }
    remove(id) {
        return this.doctorService.remove(+id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new doctor' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Doctor created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all doctors or search doctors' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of doctors' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_doctor_dto_1.SearchDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctor by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "remove", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctors'),
    (0, common_1.Controller)('doctors'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map