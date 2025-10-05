import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InsuranceService } from './insurance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Insurance')
@Controller('insurance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all insurance providers' })
  @ApiResponse({ status: 200, description: 'List of insurance providers' })
  findAll() {
    return this.insuranceService.findAll();
  }
}
