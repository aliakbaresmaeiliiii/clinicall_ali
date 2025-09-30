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
exports.DiseasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const diseases_service_1 = require("./diseases.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DiseasesController = class DiseasesController {
    constructor(diseasesService) {
        this.diseasesService = diseasesService;
    }
    findAll() {
        return this.diseasesService.findAll();
    }
};
exports.DiseasesController = DiseasesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all diseases' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of diseases' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiseasesController.prototype, "findAll", null);
exports.DiseasesController = DiseasesController = __decorate([
    (0, swagger_1.ApiTags)('Diseases'),
    (0, common_1.Controller)('diseases'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [diseases_service_1.DiseasesService])
], DiseasesController);
//# sourceMappingURL=diseases.controller.js.map