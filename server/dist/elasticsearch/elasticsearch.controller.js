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
exports.ElasticsearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const elasticsearch_service_1 = require("./elasticsearch.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ElasticsearchController = class ElasticsearchController {
    constructor(elasticsearchService) {
        this.elasticsearchService = elasticsearchService;
    }
    async ping() {
        return this.elasticsearchService.ping();
    }
    async createIndex(body) {
        return { message: 'Index creation endpoint' };
    }
    async search(query) {
        return { message: 'Search endpoint' };
    }
    async searchDoctors(searchDto) {
        const searchQuery = {
            query: {
                bool: {
                    should: [
                        {
                            multi_match: {
                                query: searchDto.query,
                                fields: [
                                    'name^3',
                                    'first_name^2',
                                    'last_name^2',
                                    'medical_code',
                                    'speciality_id',
                                    'service_id'
                                ],
                                fuzziness: 'AUTO'
                            }
                        }
                    ]
                }
            },
            sort: [
                { '_score': { 'order': 'desc' } },
                { 'average_rating': { 'order': 'desc' } },
                { 'click_count': { 'order': 'desc' } }
            ],
            size: 50
        };
        return this.elasticsearchService.search('doctors', searchQuery);
    }
    async getDoctor(id) {
        try {
            const response = await this.elasticsearchService.getDocument('doctors', id);
            return response;
        }
        catch (error) {
            return { error: 'Doctor not found in Elasticsearch' };
        }
    }
};
exports.ElasticsearchController = ElasticsearchController;
__decorate([
    (0, common_1.Get)('ping'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ping Elasticsearch' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Elasticsearch is connected' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ElasticsearchController.prototype, "ping", null);
__decorate([
    (0, common_1.Post)('index/:indexName'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Elasticsearch index' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Index created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ElasticsearchController.prototype, "createIndex", null);
__decorate([
    (0, common_1.Post)('search/:indexName'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search in Elasticsearch' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ElasticsearchController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('search-doctors'),
    (0, swagger_1.ApiOperation)({ summary: 'Search doctors in Elasticsearch' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor search results' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ElasticsearchController.prototype, "searchDoctors", null);
__decorate([
    (0, common_1.Get)('doctors/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctor by ID from Elasticsearch' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ElasticsearchController.prototype, "getDoctor", null);
exports.ElasticsearchController = ElasticsearchController = __decorate([
    (0, swagger_1.ApiTags)('Elasticsearch'),
    (0, common_1.Controller)('v1/elasticsearch'),
    __metadata("design:paramtypes", [elasticsearch_service_1.ElasticsearchService])
], ElasticsearchController);
//# sourceMappingURL=elasticsearch.controller.js.map