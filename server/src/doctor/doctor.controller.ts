import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { SearchDoctorDto } from './dto/search-doctor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors or search doctors' })
  @ApiResponse({ status: 200, description: 'List of doctors' })
  findAll(@Query() searchDto: SearchDoctorDto) {
    // If any search parameters are provided, use search method
    const hasSearchParams = Object.values(searchDto).some(
      (value) => value !== undefined && value !== null && value !== '',
    );

    if (hasSearchParams) {
      return this.doctorService.search(searchDto);
    }

    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor details' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update doctor' })
  @ApiResponse({ status: 200, description: 'Doctor updated successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doctor' })
  @ApiResponse({ status: 200, description: 'Doctor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
