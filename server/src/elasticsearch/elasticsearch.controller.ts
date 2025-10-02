import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ElasticsearchService } from './elasticsearch.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Elasticsearch')
@Controller('v1/elasticsearch')
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get('ping')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ping Elasticsearch' })
  @ApiResponse({ status: 200, description: 'Elasticsearch is connected' })
  async ping() {
    return this.elasticsearchService.ping();
  }

  @Post('index/:indexName')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Elasticsearch index' })
  @ApiResponse({ status: 201, description: 'Index created successfully' })
  async createIndex(@Body() body: any) {
    // This would need to be implemented based on your specific needs
    return { message: 'Index creation endpoint' };
  }

  @Post('search/:indexName')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search in Elasticsearch' })
  @ApiResponse({ status: 200, description: 'Search results' })
  async search(@Body() query: any) {
    // This would need to be implemented based on your specific needs
    return { message: 'Search endpoint' };
  }

  @Post('search-doctors')
  @ApiOperation({ summary: 'Search doctors in Elasticsearch' })
  @ApiResponse({ status: 200, description: 'Doctor search results' })
  async searchDoctors(@Body() searchDto: { query: string; filters?: any }) {
    const searchQuery = {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: searchDto.query,
                fields: [
                  'name^3',
                  'first_name^2', 
                  'last_name^2',
                  'medical_code',
                  'speciality_id',
                  'service_id'
                ],
                fuzziness: 'AUTO'
              }
            }
          ]
        }
      },
      sort: [
        { '_score': { 'order': 'desc' } },
        { 'average_rating': { 'order': 'desc' } },
        { 'click_count': { 'order': 'desc' } }
      ],
      size: 50
    };

    return this.elasticsearchService.search('doctors', searchQuery);
  }

  @Get('doctors/:id')
  @ApiOperation({ summary: 'Get doctor by ID from Elasticsearch' })
  @ApiResponse({ status: 200, description: 'Doctor details' })
  async getDoctor(@Param('id') id: string) {
    try {
      const response = await this.elasticsearchService.getDocument('doctors', id);
      return response;
    } catch (error) {
      return { error: 'Doctor not found in Elasticsearch' };
    }
  }
}
