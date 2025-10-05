import { SearchSimpleService, SearchResponse } from './search-simple.service';
export declare class SearchSimpleController {
    private readonly searchSimpleService;
    constructor(searchSimpleService: SearchSimpleService);
    autocomplete(query: string, types?: string): Promise<SearchResponse>;
    testSynonyms(query: string): Promise<{
        originalQuery: string;
        expandedTerms: string[];
    }>;
}
