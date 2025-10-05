import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MedicationsService } from './medications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Medications')
@Controller('medications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all medications' })
  @ApiResponse({ status: 200, description: 'List of medications' })
  findAll() {
    return this.medicationsService.findAll();
  }
}
