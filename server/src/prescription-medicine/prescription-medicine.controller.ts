import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PrescriptionMedicineService } from './prescription-medicine.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Prescription Medicine')
@Controller('prescription-medicine')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PrescriptionMedicineController {
  constructor(private readonly prescriptionMedicineService: PrescriptionMedicineService) {}

  @Get()
  @ApiOperation({ summary: 'Get all prescription medicines' })
  @ApiResponse({ status: 200, description: 'List of prescription medicines' })
  findAll() {
    return this.prescriptionMedicineService.findAll();
  }
}
