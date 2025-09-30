import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  doctorId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  clinicId: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '10:00 AM' })
  @IsString()
  time: string;

  @ApiProperty({ example: 'pending', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: 'Regular checkup', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
