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
exports.SearchEnhancedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const search_enhanced_service_1 = require("./search-enhanced.service");
let SearchEnhancedController = class SearchEnhancedController {
    constructor(searchEnhancedService) {
        this.searchEnhancedService = searchEnhancedService;
    }
    async autocomplete(query, types) {
        if (!query) {
            return {
                query: '',
                types: [],
                total: 0,
                suggestions: [],
            };
        }
        const typeList = types
            ? types.split(',').map((type) => type.trim())
            : ['doctor', 'specialty', 'disease', 'clinic'];
        return this.searchEnhancedService.mysqlSearch(query, typeList);
    }
    async fuzzySearch(query, types) {
        if (!query) {
            return {
                query: '',
                types: [],
                total: 0,
                suggestions: [],
            };
        }
        const typeList = types
            ? types.split(',').map((type) => type.trim())
            : ['doctor', 'specialty', 'disease', 'clinic'];
        return this.searchEnhancedService.elasticSearch(query, typeList);
    }
    async testSynonyms(query) {
        if (!query) {
            return {
                originalQuery: '',
                expandedTerms: [],
            };
        }
        const expandedTerms = await this.searchEnhancedService['expandQueryWithSynonyms'](query);
        return {
            originalQuery: query,
            expandedTerms,
        };
    }
};
exports.SearchEnhancedController = SearchEnhancedController;
__decorate([
    (0, common_1.Get)('autocomplete'),
    (0, swagger_1.ApiOperation)({
        summary: 'Elasticsearch-like autocomplete search',
        description: 'Search across doctors, specialties, diseases, and clinics with autocomplete, fuzzy matching, and synonym support',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns autocomplete suggestions',
        schema: {
            example: {
                query: 'dentis',
                types: ['doctor', 'specialty', 'disease', 'clinic'],
                total: 3,
                suggestions: [
                    {
                        type: 'specialty',
                        id: 21,
                        name: 'Dentistry',
                        display: 'Dentistry (Specialty)',
                    },
                    {
                        type: 'doctor',
                        id: 45,
                        name: 'Dr. John Smith',
                        display: 'Dr. John Smith - Dentistry (Doctor)',
                    },
                    {
                        type: 'clinic',
                        id: 12,
                        name: 'Dental Care Center',
                        display: 'Dental Care Center (Clinic)',
                    },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SearchEnhancedController.prototype, "autocomplete", null);
__decorate([
    (0, common_1.Get)('fuzzy'),
    (0, swagger_1.ApiOperation)({
        summary: 'Fuzzy search with Levenshtein distance',
        description: 'Search using fuzzy matching algorithm (slower but more accurate for typos)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns fuzzy search results',
        schema: {
            example: {
                query: 'dentis',
                types: ['doctor', 'specialty', 'disease', 'clinic'],
                total: 3,
                suggestions: [
                    {
                        type: 'specialty',
                        id: 21,
                        name: 'Dentistry',
                        display: 'Dentistry (Specialty)',
                    },
                    {
                        type: 'doctor',
                        id: 45,
                        name: 'Dr. John Smith',
                        display: 'Dr. John Smith - Dentistry (Doctor)',
                    },
                ],
            },
        },
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SearchEnhancedController.prototype, "fuzzySearch", null);
__decorate([
    (0, common_1.Get)('test-synonyms'),
    (0, swagger_1.ApiOperation)({
        summary: 'Test synonym expansion',
        description: 'Test how a query gets expanded with synonyms',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns expanded search terms',
        schema: {
            example: {
                originalQuery: 'tooth',
                expandedTerms: [
                    'tooth',
                    'dentist',
                    'dentistry',
                    'dental',
                    'teeth',
                    'oral',
                ],
            },
        },
    }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchEnhancedController.prototype, "testSynonyms", null);
exports.SearchEnhancedController = SearchEnhancedController = __decorate([
    (0, swagger_1.ApiTags)('search'),
    (0, common_1.Controller)('search-enhanced'),
    __metadata("design:paramtypes", [search_enhanced_service_1.SearchEnhancedService])
], SearchEnhancedController);
//# sourceMappingURL=search-enhanced.controller.js.map