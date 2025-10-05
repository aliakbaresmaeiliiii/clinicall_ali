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
exports.SearchEnhancedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SearchEnhancedService = class SearchEnhancedService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async expandQueryWithSynonyms(query) {
        const searchTerms = [query.toLowerCase()];
        const hardcodedSynonyms = {
            dentist: ['dentistry', 'dental', 'tooth', 'teeth', 'oral'],
            doctor: ['physician', 'medic', 'practitioner', 'clinician'],
            clinic: ['medical center', 'health center', 'hospital', 'practice'],
            specialty: ['specialization', 'field', 'area', 'discipline'],
            heart: ['cardiac', 'cardiovascular', 'chest'],
            skin: ['dermatology', 'dermatological', 'epidermis'],
            eye: ['ophthalmology', 'ocular', 'vision'],
            bone: ['orthopedic', 'skeletal', 'orthopaedic'],
            child: ['pediatric', 'pediatrics', 'kids', 'children'],
            woman: ['gynecology', 'obstetrics', 'female', 'women'],
            brain: ['neurology', 'neurological', 'neural'],
            cancer: ['oncology', 'tumor', 'malignancy'],
            kidney: ['nephrology', 'renal'],
            lung: ['pulmonology', 'respiratory', 'breathing'],
            stomach: ['gastroenterology', 'digestive', 'gut'],
            mental: ['psychiatry', 'psychological', 'psychology'],
            allergy: ['immunology', 'hypersensitivity', 'reaction'],
            pain: ['ache', 'discomfort', 'soreness'],
            fever: ['temperature', 'pyrexia'],
            infection: ['bacterial', 'viral', 'disease'],
            tooth: ['dentist', 'dentistry', 'dental', 'teeth', 'oral'],
            teeth: ['dentist', 'dentistry', 'dental', 'tooth', 'oral'],
            dental: ['dentist', 'dentistry', 'tooth', 'teeth', 'oral'],
            cardiology: ['heart', 'cardiac', 'cardiovascular'],
            dermatology: ['skin', 'dermatological'],
            orthopedics: ['bone', 'skeletal', 'orthopaedic'],
            pediatrics: ['child', 'children', 'kids'],
            gynecology: ['woman', 'female', 'obstetrics'],
            neurology: ['brain', 'neurological', 'neural'],
        };
        try {
            const keywords = await this.prisma.keyword.findMany({
                where: {
                    OR: [
                        { term: { contains: query } },
                        { synonyms: { contains: query } },
                    ],
                },
            });
            for (const keyword of keywords) {
                try {
                    const synonyms = JSON.parse(keyword.synonyms);
                    searchTerms.push(...synonyms);
                }
                catch (e) {
                    const synonyms = keyword.synonyms.split(',').map((s) => s.trim());
                    searchTerms.push(...synonyms);
                }
            }
            const exactMatch = await this.prisma.keyword.findFirst({
                where: { term: query.toLowerCase() },
            });
            if (exactMatch) {
                try {
                    const synonyms = JSON.parse(exactMatch.synonyms);
                    searchTerms.push(...synonyms);
                }
                catch (e) {
                    const synonyms = exactMatch.synonyms.split(',').map((s) => s.trim());
                    searchTerms.push(...synonyms);
                }
            }
            if (searchTerms.length === 1) {
                const lowerQuery = query.toLowerCase();
                for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
                    if (term.includes(lowerQuery) || lowerQuery.includes(term)) {
                        searchTerms.push(...synonyms);
                    }
                }
                for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
                    if (synonyms.some((synonym) => synonym.includes(lowerQuery) || lowerQuery.includes(synonym))) {
                        searchTerms.push(term, ...synonyms);
                    }
                }
            }
            return [...new Set(searchTerms)].filter((term) => term.length > 0);
        }
        catch (error) {
            console.warn('Keyword table not available, using hardcoded synonyms:', error);
            const lowerQuery = query.toLowerCase();
            for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
                if (term.includes(lowerQuery) || lowerQuery.includes(term)) {
                    searchTerms.push(...synonyms);
                }
            }
            for (const [term, synonyms] of Object.entries(hardcodedSynonyms)) {
                if (synonyms.some((synonym) => synonym.includes(lowerQuery) || lowerQuery.includes(synonym))) {
                    searchTerms.push(term, ...synonyms);
                }
            }
            return [...new Set(searchTerms)].filter((term) => term.length > 0);
        }
    }
    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
                }
            }
        }
        return matrix[b.length][a.length];
    }
    isFuzzyMatch(str1, str2, threshold = 2) {
        const distance = this.levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
        const maxLength = Math.max(str1.length, str2.length);
        return distance <= threshold && distance <= maxLength * 0.3;
    }
    async searchDoctors(searchTerms, limit = 5) {
        const allDoctors = await this.prisma.doctor.findMany({
            include: {
                specialty: true,
            },
        });
        const suggestions = [];
        for (const doctor of allDoctors) {
            const fullName = `${doctor.firstName || ''} ${doctor.lastName || ''}`.trim();
            const specialtyName = doctor.specialty?.name || '';
            for (const term of searchTerms) {
                if (this.isFuzzyMatch(term, fullName) ||
                    this.isFuzzyMatch(term, specialtyName) ||
                    (doctor.medicalCode && this.isFuzzyMatch(term, doctor.medicalCode))) {
                    suggestions.push({
                        type: 'doctor',
                        id: doctor.id,
                        name: fullName,
                        display: `${fullName} - ${specialtyName} (Doctor)`,
                    });
                    break;
                }
            }
        }
        return suggestions.slice(0, limit);
    }
    async searchSpecialties(searchTerms, limit = 5) {
        const allSpecialties = await this.prisma.specialty.findMany();
        const suggestions = [];
        for (const specialty of allSpecialties) {
            for (const term of searchTerms) {
                if (this.isFuzzyMatch(term, specialty.name)) {
                    suggestions.push({
                        type: 'specialty',
                        id: specialty.id,
                        name: specialty.name,
                        display: `${specialty.name} (Specialty)`,
                    });
                    break;
                }
            }
        }
        return suggestions.slice(0, limit);
    }
    async searchDiseases(searchTerms, limit = 5) {
        try {
            const allDiseases = await this.prisma.disease.findMany();
            const suggestions = [];
            for (const disease of allDiseases) {
                for (const term of searchTerms) {
                    if (this.isFuzzyMatch(term, disease.name)) {
                        suggestions.push({
                            type: 'disease',
                            id: disease.id,
                            name: disease.name,
                            display: `${disease.name} (Disease)`,
                        });
                        break;
                    }
                }
            }
            return suggestions.slice(0, limit);
        }
        catch (error) {
            console.warn('Disease table not available:', error);
            return [];
        }
    }
    async searchClinics(searchTerms, limit = 5) {
        const allClinics = await this.prisma.clinic.findMany();
        const suggestions = [];
        for (const clinic of allClinics) {
            for (const term of searchTerms) {
                if (this.isFuzzyMatch(term, clinic.name || '') ||
                    (clinic.description && this.isFuzzyMatch(term, clinic.description))) {
                    suggestions.push({
                        type: 'clinic',
                        id: clinic.id,
                        name: clinic.name || 'Unnamed Clinic',
                        display: `${clinic.name} (Clinic)`,
                    });
                    break;
                }
            }
        }
        return suggestions.slice(0, limit);
    }
    async elasticSearch(query, types = ['doctor', 'specialty', 'disease', 'clinic']) {
        if (!query || query.trim().length === 0) {
            return {
                query,
                types,
                total: 0,
                suggestions: [],
            };
        }
        const searchTerms = await this.expandQueryWithSynonyms(query);
        console.log('Expanded search terms:', searchTerms);
        const allSuggestions = [];
        const searchPromises = [];
        if (types.includes('doctor')) {
            searchPromises.push(this.searchDoctors(searchTerms, 5));
        }
        if (types.includes('specialty')) {
            searchPromises.push(this.searchSpecialties(searchTerms, 5));
        }
        if (types.includes('disease')) {
            searchPromises.push(this.searchDiseases(searchTerms, 5));
        }
        if (types.includes('clinic')) {
            searchPromises.push(this.searchClinics(searchTerms, 5));
        }
        const results = await Promise.all(searchPromises);
        results.forEach((suggestions) => allSuggestions.push(...suggestions));
        const sortedSuggestions = allSuggestions.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const queryLower = query.toLowerCase();
            const aStartsWith = aName.startsWith(queryLower);
            const bStartsWith = bName.startsWith(queryLower);
            if (aStartsWith && !bStartsWith)
                return -1;
            if (!aStartsWith && bStartsWith)
                return 1;
            const typePriority = { doctor: 0, specialty: 1, disease: 2, clinic: 3 };
            return typePriority[a.type] - typePriority[b.type];
        });
        return {
            query,
            types,
            total: sortedSuggestions.length,
            suggestions: sortedSuggestions,
        };
    }
    async mysqlSearch(query, types = ['doctor', 'specialty', 'disease', 'clinic']) {
        if (!query || query.trim().length === 0) {
            return {
                query,
                types,
                total: 0,
                suggestions: [],
            };
        }
        const searchTerms = await this.expandQueryWithSynonyms(query);
        console.log('Expanded search terms for MySQL:', searchTerms);
        const allSuggestions = [];
        const searchPromises = [];
        if (types.includes('doctor')) {
            searchPromises.push(this.prisma.doctor
                .findMany({
                where: {
                    OR: searchTerms.flatMap((term) => [
                        { firstName: { contains: term, mode: 'insensitive' } },
                        { lastName: { contains: term, mode: 'insensitive' } },
                        { medicalCode: { contains: term, mode: 'insensitive' } },
                        {
                            specialty: { name: { contains: term, mode: 'insensitive' } },
                        },
                    ]),
                },
                include: { specialty: true },
                take: 5,
            })
                .then((doctors) => doctors.map((doctor) => ({
                type: 'doctor',
                id: doctor.id,
                name: `${doctor.firstName || ''} ${doctor.lastName || ''}`.trim(),
                display: `${doctor.firstName || ''} ${doctor.lastName || ''} - ${doctor.specialty?.name || 'Unknown'} (Doctor)`,
            }))));
        }
        if (types.includes('specialty')) {
            searchPromises.push(this.prisma.specialty
                .findMany({
                where: {
                    OR: searchTerms.map((term) => ({
                        name: { contains: term, mode: 'insensitive' },
                    })),
                },
                take: 5,
            })
                .then((specialties) => specialties.map((specialty) => ({
                type: 'specialty',
                id: specialty.id,
                name: specialty.name,
                display: `${specialty.name} (Specialty)`,
            }))));
        }
        if (types.includes('disease')) {
            try {
                searchPromises.push(this.prisma.disease
                    .findMany({
                    where: {
                        OR: searchTerms.map((term) => ({
                            name: { contains: term, mode: 'insensitive' },
                        })),
                    },
                    take: 5,
                })
                    .then((diseases) => diseases.map((disease) => ({
                    type: 'disease',
                    id: disease.id,
                    name: disease.name,
                    display: `${disease.name} (Disease)`,
                }))));
            }
            catch (error) {
                console.warn('Disease table not available for MySQL search:', error);
                searchPromises.push(Promise.resolve([]));
            }
        }
        if (types.includes('clinic')) {
            searchPromises.push(this.prisma.clinic
                .findMany({
                where: {
                    OR: searchTerms.flatMap((term) => [
                        { name: { contains: term, mode: 'insensitive' } },
                        { description: { contains: term, mode: 'insensitive' } },
                    ]),
                },
                take: 5,
            })
                .then((clinics) => clinics.map((clinic) => ({
                type: 'clinic',
                id: clinic.id,
                name: clinic.name || 'Unnamed Clinic',
                display: `${clinic.name} (Clinic)`,
            }))));
        }
        const results = await Promise.all(searchPromises);
        results.forEach((suggestions) => allSuggestions.push(...suggestions));
        const uniqueSuggestions = allSuggestions.filter((suggestion, index, self) => index ===
            self.findIndex((s) => s.type === suggestion.type && s.id === suggestion.id));
        return {
            query,
            types,
            total: uniqueSuggestions.length,
            suggestions: uniqueSuggestions,
        };
    }
};
exports.SearchEnhancedService = SearchEnhancedService;
exports.SearchEnhancedService = SearchEnhancedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchEnhancedService);
//# sourceMappingURL=search-enhanced.service.js.map