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
exports.SearchDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SearchDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.type = 'all';
    }
}
exports.SearchDto = SearchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'dentist',
        description: 'Search term for doctors, clinics, specialties, or services',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Cardiology',
        description: 'Specific specialty to filter by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Kuala Lumpur',
        description: 'City to filter results by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'Male',
        description: 'Gender to filter doctors by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 1,
        description: 'Specialty ID to filter by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchDto.prototype, "specialityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 1,
        description: 'Service ID to filter by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchDto.prototype, "serviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'MYCARD0001',
        description: 'Medical code to filter doctors by',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "medicalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'dental clinic',
        description: 'Specific clinic name to search for',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "clinicName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 1,
        description: 'Page number for pagination',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 10,
        description: 'Number of results per page',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'all',
        description: 'Type of search: all, doctors, clinics, specialties',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDto.prototype, "type", void 0);
//# sourceMappingURL=search.dto.js.map