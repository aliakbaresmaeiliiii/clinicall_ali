import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // Try to validate as clinic first
    try {
      const clinic = await this.authService.validateClinic(email, password);
      if (clinic) {
        return { ...clinic, userType: 'clinic' };
      }
    } catch (error) {
      // Continue to try other user types
    }

    // Try to validate as doctor
    try {
      const doctor = await this.authService.validateDoctor(email, password);
      if (doctor) {
        return { ...doctor, userType: 'doctor' };
      }
    } catch (error) {
      // Continue to try other user types
    }

    // Try to validate as patient
    try {
      const patient = await this.authService.validatePatient(email, password);
      if (patient) {
        return { ...patient, userType: 'patient' };
      }
    } catch (error) {
      // All validation attempts failed
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}
