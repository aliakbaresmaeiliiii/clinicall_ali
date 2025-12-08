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
exports.RegisterClinicDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const match_decorator_1 = require("../decorators/match.decorator");
class RegisterClinicDto {
}
exports.RegisterClinicDto = RegisterClinicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clinic@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, match_decorator_1.Match)('password', { message: 'Password and confirm password do not match' }),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'City Medical Center' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Owner Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "owner_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main St' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'City Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'State Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '47650' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "zip_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Country Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Medical clinic description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://clinic-website.com', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterClinicDto.prototype, "website", void 0);
//# sourceMappingURL=register-clinic.dto.js.map