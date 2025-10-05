import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Clinics')
@Controller('clinics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new clinic' })
  @ApiResponse({ status: 201, description: 'Clinic created successfully' })
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clinics' })
  @ApiResponse({ status: 200, description: 'List of clinics' })
  findAll() {
    return this.clinicService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get clinic by ID' })
  @ApiResponse({ status: 200, description: 'Clinic details' })
  @ApiResponse({ status: 404, description: 'Clinic not found' })
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update clinic' })
  @ApiResponse({ status: 200, description: 'Clinic updated successfully' })
  @ApiResponse({ status: 404, description: 'Clinic not found' })
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(+id, updateClinicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete clinic' })
  @ApiResponse({ status: 200, description: 'Clinic deleted successfully' })
  @ApiResponse({ status: 404, description: 'Clinic not found' })
  remove(@Param('id') id: string) {
    return this.clinicService.remove(+id);
  }
}
