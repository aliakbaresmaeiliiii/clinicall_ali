import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process AI request' })
  @ApiResponse({ status: 200, description: 'AI processing completed' })
  async processRequest(@Body() data: any) {
    return this.aiService.processRequest(data);
  }
}
