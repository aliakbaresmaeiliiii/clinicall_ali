import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { ShareAuthService } from '../../../services/share.service';
import { AuthService } from '../../../services/auth.service';
import { PatientVerificationResponse } from '../../models/patient.model';

@Component({
  selector: 'app-confirm-email',
  standalone: false,
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  #userService = inject(UserService);
  authService = inject(AuthService);
  #toastrService = inject(ToastrService);
  #shareSerivce = inject(ShareAuthService);
  userData: any;
  form!: FormGroup;
  #router = inject(Router);
  otp!: string;
  showOtpComponent = true;
  selectedRole: string = '';
  timeLeft: number = 0; // Timer in seconds
  timerInterval: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    console.log('Confirm Email Component initialized');
    this.form = new FormGroup({
      verify_code: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    
    // Get user data and role from shared service
    this.userData = this.#shareSerivce.getEmail();
    this.selectedRole = this.#shareSerivce.getSelectedRole();

    // Check if we have the required data
    if (!this.userData || !this.selectedRole) {
      console.warn('User data or role is missing. User may have navigated directly to this page.');
      this.#toastrService.warning('Please complete registration first.');
      // Don't automatically resend OTP if data is missing
      return;
    }

    console.log('User data available:', { email: this.userData, role: this.selectedRole });
    
    // Start the timer immediately when component loads with valid data
    this.startTimer(120); // 2 minutes = 120 seconds
  }
  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp.length === this.config.length) {
      this.onSubmit();
    }
  }

  onSubmit() {
    // Validate that we have the required data
    if (!this.userData || !this.selectedRole) {
      this.#toastrService.error('Missing user data or role. Please complete registration first.');
      return;
    }

    if (!this.otp || this.otp.length !== this.config.length) {
      this.#toastrService.error('Please enter a valid verification code.');
      return;
    }

    const payload = {
      email: this.userData,
      verifyCode: this.otp,
    };

    this.handleRoleBasedVerification(payload);
  }

  private handleRoleBasedVerification(payload: any): void {
    switch (this.selectedRole) {
      case 'patient':
        this.handlePatientVerification(payload);
        break;
      case 'clinic':
        this.handleClinicVerification(payload);
        break;
      case 'doctor':
        this.handleDoctorVerification(payload);
        break;
      default:
        this.#toastrService.error('Invalid role selected');
        break;
    }
  }

  private handleVerificationSuccess(res: any, redirectRoute: string): void {
    if (res) {
      // Ensure the verification status is properly set
      const userData = {
        ...res,
        isVerified: true,
        is_verified: true
      };
      
      // Store user data in localStorage
      const dataJson = JSON.stringify(userData);
      localStorage.setItem('userData', dataJson);
      localStorage.setItem('isAuthenticated', 'true');
      this.#router.navigate([redirectRoute]);
    } else {
      this.#toastrService.error('Invalid response from server');
    }
  }

  private handleVerificationError(err: any): void {
    this.#toastrService.error(
      'Email verification failed. Please check your code and try again.'
    );
  }

  private handlePatientVerification(payload: any): void {
    this.authService.verifyPatientEmail(payload).subscribe({
      next: (res: any) => {
        this.handleVerificationSuccess(res, '');
      },
      error: (err: any) => {
        this.handleVerificationError(err);
      }
    });
  }

  private handleClinicVerification(payload: any): void {
    this.authService.confirmClinicEmail(payload).subscribe({
      next: (res: any) => {
        this.handleVerificationSuccess(res, '/dashboard');
      },
      error: (err: any) => {
        this.handleVerificationError(err);
      }
    });
  }

  private handleDoctorVerification(payload: any): void {
    this.authService.confirmDoctorEmail(payload).subscribe({
      next: (res: any) => {
        this.handleVerificationSuccess(res, '/dashboard');
      },
      error: (err: any) => {
        this.handleVerificationError(err);
      }
    });
  }

  getOtp() {
    this.#userService.getOTP(this.userData).subscribe(res => {
      // Start the 2-minute timer when OTP is requested
      this.startTimer(120); // 2 minutes = 120 seconds
    });
  }

  // Start timer with specified seconds
  private startTimer(seconds: number): void {
    console.log('Starting timer with', seconds, 'seconds');
    this.timeLeft = seconds;
    
    // Clear any existing timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    // Start new timer
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      console.log('Timer tick:', this.timeLeft, 'seconds remaining');
      
      if (this.timeLeft <= 0) {
        console.log('Timer expired');
        clearInterval(this.timerInterval);
        this.#toastrService.warning('Verification code has expired. Please request a new one.');
      }
    }, 1000);
  }

  // Format time from seconds to MM:SS format
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Clean up timer when component is destroyed
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  get verify_code() {
    return this.form.get('verify_code');
  }
}
