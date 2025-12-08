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
exports.ClinicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let ClinicService = class ClinicService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClinicDto) {
        const { password, confirmPassword, owner_name, city, state, zip_code, country, ...rest } = createClinicDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        let fullAddress = rest.address;
        if (city || state || zip_code || country) {
            const addressParts = [];
            if (rest.address)
                addressParts.push(rest.address);
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
        const clinicName = rest.name || owner_name || 'Clinic';
        return this.prisma.clinic.create({
            data: {
                ...rest,
                name: clinicName,
                password: hashedPassword,
                address: fullAddress,
            },
        });
    }
    async findAll() {
        return this.prisma.clinic.findMany({
            include: {
                clinicDoctors: {
                    include: {
                        doctor: true,
                    },
                },
                appointments: true,
            },
        });
    }
    async findOne(id) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { id },
            include: {
                clinicDoctors: {
                    include: {
                        doctor: true,
                    },
                },
                appointments: true,
            },
        });
        if (!clinic) {
            throw new common_1.NotFoundException('Clinic not found');
        }
        return clinic;
    }
    async update(id, updateClinicDto) {
        const clinic = await this.findOne(id);
        const { password, confirmPassword, owner_name, city, state, zip_code, country, ...rest } = updateClinicDto;
        const updateData = { ...rest };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        if (city || state || zip_code || country) {
            const addressParts = [];
            if (rest.address)
                addressParts.push(rest.address);
            if (city)
                addressParts.push(city);
            if (state)
                addressParts.push(state);
            if (zip_code)
                addressParts.push(zip_code);
            if (country)
                addressParts.push(country);
            updateData.address = addressParts.join(', ');
        }
        if (owner_name && !rest.name) {
            updateData.name = owner_name;
        }
        return this.prisma.clinic.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        const clinic = await this.findOne(id);
        return this.prisma.clinic.delete({
            where: { id },
        });
    }
};
exports.ClinicService = ClinicService;
exports.ClinicService = ClinicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClinicService);
//# sourceMappingURL=clinic.service.js.map