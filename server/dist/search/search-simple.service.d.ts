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
export declare class SearchSimpleService {
    private prisma;
    constructor(prisma: PrismaService);
    private expandQueryWithSynonyms;
    search(query: string, types?: string[]): Promise<SearchResponse>;
    testSynonyms(query: string): Promise<{
        originalQuery: string;
        expandedTerms: string[];
    }>;
}
