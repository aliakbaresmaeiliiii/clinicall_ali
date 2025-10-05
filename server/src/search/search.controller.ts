import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { AutocompleteDto } from './dto/autocomplete.dto';

@ApiTags('Search')
@Controller('v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('autocomplete')
  @ApiOperation({
    summary: 'Get autocomplete suggestions',
    description:
      'Get quick search suggestions for specialties, doctors, and clinics - Public endpoint (no authentication required)',
  })
  @ApiResponse({
    status: 200,
    description: 'Autocomplete suggestions',
  })
  async autocomplete(@Query() autocompleteDto: AutocompleteDto) {
    return this.searchService.autocomplete(autocompleteDto);
  }
}
