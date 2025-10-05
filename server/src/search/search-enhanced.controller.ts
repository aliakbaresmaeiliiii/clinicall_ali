import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SearchEnhancedService,
  SearchResponse,
} from './search-enhanced.service';

@ApiTags('search')
@Controller('search-enhanced')
export class SearchEnhancedController {
  constructor(private readonly searchEnhancedService: SearchEnhancedService) {}

  @Get('autocomplete')
  @ApiOperation({
    summary: 'Elasticsearch-like autocomplete search',
    description:
      'Search across doctors, specialties, diseases, and clinics with autocomplete, fuzzy matching, and synonym support',
  })
  @ApiResponse({
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
  })
  async autocomplete(
    @Query('q') query: string,
    @Query('types') types?: string,
  ) {
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

    // Use MySQL search for better performance
    return this.searchEnhancedService.mysqlSearch(query, typeList);
  }

  @Get('fuzzy')
  @ApiOperation({
    summary: 'Fuzzy search with Levenshtein distance',
    description:
      'Search using fuzzy matching algorithm (slower but more accurate for typos)',
  })
  @ApiResponse({
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
  })
  async fuzzySearch(@Query('q') query: string, @Query('types') types?: string) {
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

    // Use fuzzy search implementation
    return this.searchEnhancedService.elasticSearch(query, typeList);
  }

  @Get('test-synonyms')
  @ApiOperation({
    summary: 'Test synonym expansion',
    description: 'Test how a query gets expanded with synonyms',
  })
  @ApiResponse({
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
  })
  async testSynonyms(@Query('q') query: string) {
    if (!query) {
      return {
        originalQuery: '',
        expandedTerms: [],
      };
    }

    // Create a temporary instance to test synonym expansion
    const expandedTerms =
      await this.searchEnhancedService['expandQueryWithSynonyms'](query);

    return {
      originalQuery: query,
      expandedTerms,
    };
  }
}
