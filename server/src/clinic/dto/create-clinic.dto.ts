import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../auth/decorators/match.decorator';

export class CreateClinicDto {
  @ApiProperty({ example: 'City Medical Center' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Owner Name' })
  @IsString()
  @IsOptional()
  owner_name?: string;

  @ApiProperty({ example: 'clinic@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Password and confirm password do not match' })
  confirmPassword: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'City Name' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'State Name' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: '47650' })
  @IsString()
  @IsOptional()
  zip_code?: string;

  @ApiProperty({ example: 'Country Name' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'Medical clinic description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://clinic-website.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: 'clinic-logo.png', required: false })
  @IsOptional()
  @IsString()
  logo?: string;
}
