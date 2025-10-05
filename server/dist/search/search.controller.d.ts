import { SearchService } from './search.service';
import { AutocompleteDto } from './dto/autocomplete.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    autocomplete(autocompleteDto: AutocompleteDto): Promise<{
        query: string;
        types: string[];
        suggestions: any[];
        total: number;
    }>;
}
