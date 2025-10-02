import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDoctorDto {
  @ApiProperty({ required: false, example: 'Ahmad' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: 'Cardiology' })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiProperty({ required: false, example: 'Kuala Lumpur' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false, example: 'Male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  specialityId?: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @ApiProperty({ required: false, example: 'MYCARD0001' })
  @IsOptional()
  @IsString()
  medicalCode?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
