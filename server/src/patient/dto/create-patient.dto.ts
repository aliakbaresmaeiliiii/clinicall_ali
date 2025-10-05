import {
  IsEmail,
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'patient@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  mobile: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  age: number;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  patientName: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsEnum(['Male', 'Female', 'Other'])
  gender: string;

  @ApiProperty({
    example: 'Single',
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
  })
  @IsEnum(['Single', 'Married', 'Divorced', 'Widowed'])
  maritalStatus: string;

  @ApiProperty({ example: '123 Main St, City, State', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'A+',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  bloodGroup?: string;
}
