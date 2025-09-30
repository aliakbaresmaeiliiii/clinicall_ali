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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionMedicineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prescription_medicine_service_1 = require("./prescription-medicine.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PrescriptionMedicineController = class PrescriptionMedicineController {
    constructor(prescriptionMedicineService) {
        this.prescriptionMedicineService = prescriptionMedicineService;
    }
    findAll() {
        return this.prescriptionMedicineService.findAll();
    }
};
exports.PrescriptionMedicineController = PrescriptionMedicineController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all prescription medicines' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of prescription medicines' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrescriptionMedicineController.prototype, "findAll", null);
exports.PrescriptionMedicineController = PrescriptionMedicineController = __decorate([
    (0, swagger_1.ApiTags)('Prescription Medicine'),
    (0, common_1.Controller)('prescription-medicine'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [prescription_medicine_service_1.PrescriptionMedicineService])
], PrescriptionMedicineController);
//# sourceMappingURL=prescription-medicine.controller.js.map