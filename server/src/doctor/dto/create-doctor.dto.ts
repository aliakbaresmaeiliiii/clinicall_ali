import {
  IsEmail,
  IsString,
  IsInt,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Male' })
  @IsString()
  gender: string;

  @ApiProperty({ example: 35 })
  @IsInt()
  age: number;

  @ApiProperty({ example: 'doctor@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'DOC123456' })
  @IsString()
  medicalCode: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  specialityId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  serviceId: number;

  @ApiProperty({ example: 'profile.jpg', required: false })
  @IsOptional()
  @IsString()
  profileImg?: string;
}
