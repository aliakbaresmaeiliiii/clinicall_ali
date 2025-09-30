"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionMedicineModule = void 0;
const common_1 = require("@nestjs/common");
const prescription_medicine_controller_1 = require("./prescription-medicine.controller");
const prescription_medicine_service_1 = require("./prescription-medicine.service");
let PrescriptionMedicineModule = class PrescriptionMedicineModule {
};
exports.PrescriptionMedicineModule = PrescriptionMedicineModule;
exports.PrescriptionMedicineModule = PrescriptionMedicineModule = __decorate([
    (0, common_1.Module)({
        controllers: [prescription_medicine_controller_1.PrescriptionMedicineController],
        providers: [prescription_medicine_service_1.PrescriptionMedicineService],
        exports: [prescription_medicine_service_1.PrescriptionMedicineService],
    })
], PrescriptionMedicineModule);
//# sourceMappingURL=prescription-medicine.module.js.map