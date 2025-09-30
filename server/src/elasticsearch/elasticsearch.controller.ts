import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ElasticsearchService } from './elasticsearch.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Elasticsearch')
@Controller('elasticsearch')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ElasticsearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get('ping')
  @ApiOperation({ summary: 'Ping Elasticsearch' })
  @ApiResponse({ status: 200, description: 'Elasticsearch is connected' })
  async ping() {
    return this.elasticsearchService.ping();
  }

  @Post('index/:indexName')
  @ApiOperation({ summary: 'Create Elasticsearch index' })
  @ApiResponse({ status: 201, description: 'Index created successfully' })
  async createIndex(@Body() body: any) {
    // This would need to be implemented based on your specific needs
    return { message: 'Index creation endpoint' };
  }

  @Post('search/:indexName')
  @ApiOperation({ summary: 'Search in Elasticsearch' })
  @ApiResponse({ status: 200, description: 'Search results' })
  async search(@Body() query: any) {
    // This would need to be implemented based on your specific needs
    return { message: 'Search endpoint' };
  }
}
