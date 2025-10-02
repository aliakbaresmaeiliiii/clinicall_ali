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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DoctorService = class DoctorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDoctorDto) {
        return this.prisma.doctor.create({
            data: createDoctorDto,
        });
    }
    async findAll() {
        return this.prisma.doctor.findMany({
            include: {
                addresses: true,
                reviews: true,
                appointments: true,
            },
        });
    }
    async findOne(id) {
        const doctor = await this.prisma.doctor.findUnique({
            where: { id },
            include: {
                addresses: true,
                reviews: true,
                appointments: true,
            },
        });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
        }
        return doctor;
    }
    async update(id, updateDoctorDto) {
        const doctor = await this.findOne(id);
        return this.prisma.doctor.update({
            where: { id },
            data: updateDoctorDto,
        });
    }
    async remove(id) {
        const doctor = await this.findOne(id);
        return this.prisma.doctor.delete({
            where: { id },
        });
    }
    async search(searchDto) {
        const { name, specialty, city, gender, specialityId, serviceId, medicalCode, page = 1, limit = 10, } = searchDto;
        const skip = (page - 1) * limit;
        const take = limit;
        const where = {};
        if (name) {
            where.OR = [
                { firstName: { contains: name, mode: 'insensitive' } },
                { lastName: { contains: name, mode: 'insensitive' } },
            ];
        }
        if (gender) {
            where.gender = gender;
        }
        if (specialityId) {
            where.specialityId = specialityId;
        }
        if (serviceId) {
            where.serviceId = serviceId;
        }
        if (medicalCode) {
            where.medicalCode = { contains: medicalCode, mode: 'insensitive' };
        }
        let includeAddresses = false;
        if (city) {
            includeAddresses = true;
        }
        const doctors = await this.prisma.doctor.findMany({
            where,
            include: {
                addresses: includeAddresses,
                reviews: true,
                appointments: true,
                clinicDoctors: {
                    include: {
                        clinic: true,
                    },
                },
            },
            skip,
            take,
            orderBy: {
                firstName: 'asc',
            },
        });
        let filteredDoctors = doctors;
        if (city) {
            filteredDoctors = doctors.filter(doctor => doctor.addresses.some(address => address.country === 'Malaysia' &&
                (address.addressLine1?.toLowerCase().includes(city.toLowerCase()) ||
                    address.addressLine2?.toLowerCase().includes(city.toLowerCase()))));
        }
        if (specialty) {
            filteredDoctors = filteredDoctors.filter(doctor => {
                const specialtyMap = {
                    1: 'General Practice',
                    2: 'Cardiology',
                    3: 'Dermatology',
                    4: 'Pediatrics',
                    5: 'Obstetrics & Gynecology',
                    6: 'Orthopedics',
                    7: 'Neurology',
                    8: 'Psychiatry',
                    9: 'Ophthalmology',
                    10: 'ENT (Ear, Nose, Throat)',
                    11: 'Gastroenterology',
                    12: 'Urology',
                    13: 'Endocrinology',
                    14: 'Rheumatology',
                    15: 'Oncology',
                    16: 'Nephrology',
                    17: 'Pulmonology',
                    18: 'Hematology',
                    19: 'Infectious Diseases',
                    20: 'Emergency Medicine',
                };
                const doctorSpecialty = specialtyMap[doctor.specialityId];
                return doctorSpecialty?.toLowerCase().includes(specialty.toLowerCase());
            });
        }
        const total = await this.prisma.doctor.count({ where });
        return {
            data: filteredDoctors,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map