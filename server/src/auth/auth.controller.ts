import { 
  Body, 
  Controller, 
  Post, 
  Request, 
  UseGuards, 
  Get, 
  Put,
  Param,
  ParseIntPipe 
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PatientEmailSignInDto } from './dto/patient-email-sign-in.dto';

@ApiTags('Authentication')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('clinic/register')
  @ApiOperation({ summary: 'Register a new clinic' })
  @ApiResponse({ status: 201, description: 'Clinic registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async registerClinic(@Body() registerClinicDto: RegisterClinicDto) {
    const result = await this.authService.registerClinic(registerClinicDto);
    return {
      statusCode: 201,
      message: 'Clinic registered successfully',
      data: result
    };
  }

  @Post('patient/register')
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiResponse({ status: 201, description: 'Patient registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    const result = await this.authService.registerPatient(registerPatientDto);
    return {
      statusCode: 201,
      message: 'Patient registered successfully',
      data: result
    };
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
    const result = await this.authService.login(req.user, 'clinic');
    return {
      statusCode: 200,
      message: 'Login successful',
      data: result
    };
  }

  @Post('doctor-sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign in as doctor' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async doctorSignIn(@Request() req) {
    const result = await this.authService.login(req.user, 'doctor');
    return {
      statusCode: 200,
      message: 'Login successful',
      data: result
    };
  }

  @Post('patient-sign-in')
  @ApiOperation({ summary: 'Sign in as patient' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async patientSignIn(@Body() patientEmailSignInDto: PatientEmailSignInDto) {
    const result = await this.authService.patientEmailSignIn(patientEmailSignInDto.email);
    return {
      statusCode: 200,
      message: 'Login successful',
      data: result
    };
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshToken(@Body() body: { refresh_token: string }) {
    const result = await this.authService.refreshToken(body.refresh_token);
    return {
      statusCode: 200,
      message: 'Token refreshed successfully',
      data: result
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Body() body: { refresh_token: string }) {
    const result = await this.authService.logout(body.refresh_token);
    return {
      statusCode: 200,
      message: 'Logged out successfully',
      data: result
    };
  }

  @Get('patient/profile/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get patient profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async getPatientProfile(@Param('id', ParseIntPipe) patientId: number) {
    return this.authService.getPatientProfile(patientId);
  }

  @Put('patient/profile/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update patient profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  async updatePatientProfile(
    @Param('id', ParseIntPipe) patientId: number,
    @Body() updatePatientProfileDto: UpdatePatientProfileDto
  ) {
    return this.authService.updatePatientProfile(patientId, updatePatientProfileDto);
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
