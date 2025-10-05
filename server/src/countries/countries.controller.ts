import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Countries')
@Controller('countries')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'List of countries' })
  findAll() {
    return this.countriesService.findAll();
  }
}
