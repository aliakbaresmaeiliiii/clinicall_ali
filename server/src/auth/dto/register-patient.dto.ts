import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPatientDto {
  @ApiProperty({ example: 'patient@example.com' })
  @IsEmail()
  email: string;
}
