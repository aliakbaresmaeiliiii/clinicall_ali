import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DiseasesService } from './diseases.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Diseases')
@Controller('diseases')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all diseases' })
  @ApiResponse({ status: 200, description: 'List of diseases' })
  findAll() {
    return this.diseasesService.findAll();
  }
}
