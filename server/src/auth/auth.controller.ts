import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('clinic/register')
  @ApiOperation({ summary: 'Register a new clinic' })
  @ApiResponse({ status: 201, description: 'Clinic registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async registerClinic(@Body() registerClinicDto: RegisterClinicDto) {
    return this.authService.registerClinic(registerClinicDto);
  }

  @Post('patient/register')
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiResponse({ status: 201, description: 'Patient registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    return this.authService.registerPatient(registerPatientDto);
  }

  @Post('verify-clinic-email')
  @ApiOperation({ summary: 'Verify clinic email' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Clinic not found' })
  async verifyClinicEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyClinicEmail(verifyEmailDto);
  }

  @Post('verify-patient-email')
  @ApiOperation({ summary: 'Verify patient email' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async verifyPatientEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyPatientEmail(verifyEmailDto);
  }

  @Post('clinic-sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign in as clinic' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async clinicSignIn(@Request() req) {
    return this.authService.login(req.user, 'clinic');
  }

  @Post('doctor-sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign in as doctor' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async doctorSignIn(@Request() req) {
    return this.authService.login(req.user, 'doctor');
  }

  @Post('patient-sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign in as patient' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async patientSignIn(@Request() req) {
    return this.authService.login(req.user, 'patient');
  }

  @Post('verify-recaptcha')
  @ApiOperation({ summary: 'Verify reCAPTCHA token' })
  @ApiResponse({ status: 200, description: 'reCAPTCHA verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async verifyRecaptcha(@Body() body: { token: string }) {
    // TODO: Implement reCAPTCHA verification
    return { success: true };
  }
}
