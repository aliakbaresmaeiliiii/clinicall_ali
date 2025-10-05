import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchSimpleService, SearchResponse } from './search-simple.service';

@ApiTags('search')
@Controller('search-simple')
export class SearchSimpleController {
  constructor(private readonly searchSimpleService: SearchSimpleService) {}

  @Get('autocomplete')
  @ApiOperation({
    summary: 'Simple Elasticsearch-like autocomplete search',
    description:
      'Search across doctors, specialties, diseases, and clinics with autocomplete and synonym support',
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
  ): Promise<SearchResponse> {
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

    return this.searchSimpleService.search(query, typeList);
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

    return this.searchSimpleService.testSynonyms(query);
  }
}
