import { SearchEnhancedService, SearchResponse } from './search-enhanced.service';
export declare class SearchEnhancedController {
    private readonly searchEnhancedService;
    constructor(searchEnhancedService: SearchEnhancedService);
    autocomplete(query: string, types?: string): Promise<SearchResponse>;
    fuzzySearch(query: string, types?: string): Promise<SearchResponse>;
    testSynonyms(query: string): Promise<{
        originalQuery: string;
        expandedTerms: string[];
    }>;
}
