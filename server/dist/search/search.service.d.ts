import { PrismaService } from '../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';
import { AutocompleteDto } from './dto/autocomplete.dto';
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    search(searchDto: SearchDto): Promise<{
        data: {
            doctors: any[];
            clinics: any[];
            specialties: any[];
        };
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        searchSummary: {
            query: string;
            specialty: string;
            city: string;
            type: string;
            resultsFound: number;
        };
    }>;
    getSpecialties(): Promise<{
        id: number;
        name: string;
    }[]>;
    autocomplete(autocompleteDto: AutocompleteDto): Promise<{
        query: string;
        types: string[];
        suggestions: any[];
        total: number;
    }>;
}
