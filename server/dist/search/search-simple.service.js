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
exports.SearchSimpleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SearchSimpleService = class SearchSimpleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    expandQueryWithSynonyms(query) {
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
        const lowerQuery = query.toLowerCase();
        if (hardcodedSynonyms[lowerQuery]) {
            searchTerms.push(...hardcodedSynonyms[lowerQuery]);
        }
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
    async search(query, types = ['doctor', 'specialty', 'disease', 'clinic']) {
        if (!query || query.trim().length === 0) {
            return {
                query,
                types,
                total: 0,
                suggestions: [],
            };
        }
        const searchTerms = this.expandQueryWithSynonyms(query);
        console.log('Expanded search terms:', searchTerms);
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
            const diseaseSuggestions = [
                {
                    type: 'disease',
                    id: 1,
                    name: 'Diabetes',
                    display: 'Diabetes (Disease)',
                },
                {
                    type: 'disease',
                    id: 2,
                    name: 'Hypertension',
                    display: 'Hypertension (Disease)',
                },
                {
                    type: 'disease',
                    id: 3,
                    name: 'Asthma',
                    display: 'Asthma (Disease)',
                },
                {
                    type: 'disease',
                    id: 4,
                    name: 'Arthritis',
                    display: 'Arthritis (Disease)',
                },
                {
                    type: 'disease',
                    id: 5,
                    name: 'Migraine',
                    display: 'Migraine (Disease)',
                },
            ]
                .filter((disease) => searchTerms.some((term) => disease.name.toLowerCase().includes(term.toLowerCase())))
                .slice(0, 5);
            searchPromises.push(Promise.resolve(diseaseSuggestions));
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
        const sortedSuggestions = uniqueSuggestions.sort((a, b) => {
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
    async testSynonyms(query) {
        const expandedTerms = this.expandQueryWithSynonyms(query);
        return {
            originalQuery: query,
            expandedTerms,
        };
    }
};
exports.SearchSimpleService = SearchSimpleService;
exports.SearchSimpleService = SearchSimpleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchSimpleService);
//# sourceMappingURL=search-simple.service.js.map