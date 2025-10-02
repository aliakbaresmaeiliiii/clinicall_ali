import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatientEmailSignInDto {
  @ApiProperty({ example: 'patient@example.com' })
  @IsEmail()
  email: string;
}
