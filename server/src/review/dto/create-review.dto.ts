import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  doctorId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Great doctor, very professional', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: 'Highly recommended', required: false })
  @IsOptional()
  @IsString()
  recommendations?: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  professionalDemeanor?: number;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  sufficientTime?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  skill?: number;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  staffBehavior?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  clinicCondition?: number;
}
