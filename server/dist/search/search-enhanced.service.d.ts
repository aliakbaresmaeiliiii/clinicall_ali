import { PrismaService } from '../prisma/prisma.service';
export interface SearchSuggestion {
    type: 'doctor' | 'specialty' | 'disease' | 'clinic';
    id: number;
    name: string;
    display: string;
}
export interface SearchResponse {
    query: string;
    types: string[];
    total: number;
    suggestions: SearchSuggestion[];
}
export declare class SearchEnhancedService {
    private prisma;
    constructor(prisma: PrismaService);
    private expandQueryWithSynonyms;
    private levenshteinDistance;
    private isFuzzyMatch;
    private searchDoctors;
    private searchSpecialties;
    private searchDiseases;
    private searchClinics;
    elasticSearch(query: string, types?: string[]): Promise<SearchResponse>;
    mysqlSearch(query: string, types?: string[]): Promise<SearchResponse>;
}
