import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AutocompleteDto {
  @ApiProperty({
    required: false,
    example: 'dent',
    description: 'Search term for autocomplete suggestions',
  })
  @IsString()
  query: string;

  @ApiProperty({
    required: false,
    example: 5,
    description: 'Maximum number of suggestions to return',
  })
  @IsOptional()
  limit?: number = 5;

  @ApiProperty({
    required: false,
    example: 'doctor,specialty,disease,clinic',
    description:
      'Comma-separated list of types to include in autocomplete (doctor, specialty, disease, clinic)',
  })
  @IsOptional()
  @IsString()
  types?: string = 'doctor,specialty,clinic';
}
