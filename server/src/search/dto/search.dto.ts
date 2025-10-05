import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    required: false,
    example: 'dentist',
    description: 'Search term for doctors, clinics, specialties, or services',
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    required: false,
    example: 'Cardiology',
    description: 'Specific specialty to filter by',
  })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiProperty({
    required: false,
    example: 'Kuala Lumpur',
    description: 'City to filter results by',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    required: false,
    example: 'Male',
    description: 'Gender to filter doctors by',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'Specialty ID to filter by',
  })
  @IsOptional()
  @IsNumber()
  specialityId?: number;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'Service ID to filter by',
  })
  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @ApiProperty({
    required: false,
    example: 'MYCARD0001',
    description: 'Medical code to filter doctors by',
  })
  @IsOptional()
  @IsString()
  medicalCode?: string;

  @ApiProperty({
    required: false,
    example: 'dental clinic',
    description: 'Specific clinic name to search for',
  })
  @IsOptional()
  @IsString()
  clinicName?: string;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'Page number for pagination',
  })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'Number of results per page',
  })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({
    required: false,
    example: 'all',
    description: 'Type of search: all, doctors, clinics, specialties',
  })
  @IsOptional()
  @IsString()
  type?: string = 'all';
}
