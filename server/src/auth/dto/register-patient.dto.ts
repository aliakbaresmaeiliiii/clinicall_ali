import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPatientDto {
  @ApiProperty({ example: 'patient@example.com' })
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @IsOptional()
  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @IsOptional()
  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @IsOptional()
  @ApiProperty({ example: '+1234567890' })
  @IsString()
  mobile: string;

  @IsOptional()
  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsEnum(['Male', 'Female', 'Other'])
  gender: string;

  @IsOptional()
  @ApiProperty({ example: 30 })
  @IsInt()
  age: number;

  @IsOptional()
  @ApiProperty({ example: 'Single', enum: ['Single', 'Married', 'Divorced', 'Widowed'] })
  @IsEnum(['Single', 'Married', 'Divorced', 'Widowed'])
  maritalStatus: string;

  @IsOptional()
  @ApiProperty({ example: '123 Main St, City, State', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
