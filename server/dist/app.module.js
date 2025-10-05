"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const doctor_module_1 = require("./doctor/doctor.module");
const patient_module_1 = require("./patient/patient.module");
const clinic_module_1 = require("./clinic/clinic.module");
const appointment_module_1 = require("./appointment/appointment.module");
const review_module_1 = require("./review/review.module");
const ai_module_1 = require("./ai/ai.module");
const cities_module_1 = require("./cities/cities.module");
const countries_module_1 = require("./countries/countries.module");
const diseases_module_1 = require("./diseases/diseases.module");
const insurance_module_1 = require("./insurance/insurance.module");
const medications_module_1 = require("./medications/medications.module");
const nav_items_module_1 = require("./nav-items/nav-items.module");
const prescription_medicine_module_1 = require("./prescription-medicine/prescription-medicine.module");
const refresh_token_module_1 = require("./refresh-token/refresh-token.module");
const user_module_1 = require("./user/user.module");
const search_module_1 = require("./search/search.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 10,
                },
            ]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            doctor_module_1.DoctorModule,
            patient_module_1.PatientModule,
            clinic_module_1.ClinicModule,
            appointment_module_1.AppointmentModule,
            review_module_1.ReviewModule,
            ai_module_1.AiModule,
            cities_module_1.CitiesModule,
            countries_module_1.CountriesModule,
            diseases_module_1.DiseasesModule,
            insurance_module_1.InsuranceModule,
            medications_module_1.MedicationsModule,
            nav_items_module_1.NavItemsModule,
            prescription_medicine_module_1.PrescriptionMedicineModule,
            refresh_token_module_1.RefreshTokenModule,
            user_module_1.UserModule,
            search_module_1.SearchModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map