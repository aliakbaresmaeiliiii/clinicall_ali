import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ShareAuthService } from '../../../services/share.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-confirm-email',
  standalone: false,
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  #userService = inject(UserService);
  authService = inject(AuthService);
  #toastrService = inject(ToastrService);
  #shareSerivce = inject(ShareAuthService);
  #cdr = inject(ChangeDetectorRef);
  userData: any;
  form!: FormGroup;
  #router = inject(Router);
  otp!: string;
  showOtpComponent = true;
  selectedRole: string = '';
  timeLeft: number = 0; // Timer in seconds
  timerSubscription: Subscription | null = null;
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
    this.form = new FormGroup({
      verify_code: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    // Get user data and role from shared service
    this.userData = this.#shareSerivce.getEmail();
    this.selectedRole = this.#shareSerivce.getSelectedRole();
    debugger;

    // Check if we have the required data
    if (!this.userData || !this.selectedRole) {
      console.warn(
        'User data or role is missing. User may have navigated directly to this page.'
      );
      this.#toastrService.warning('Please complete registration first.');
      // Don't automatically resend OTP if data is missing
      return;
    }

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
      this.#toastrService.error(
        'Missing user data or role. Please complete registration first.'
      );
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
        is_verified: true,
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
      },
    });
  }

  private handleClinicVerification(payload: any): void {
    debugger;
    this.authService.confirmClinicEmail(payload).subscribe({
      next: (res: any) => {
        this.handleVerificationSuccess(res, '/dashboard');
      },
      error: (err: any) => {
        this.handleVerificationError(err);
      },
    });
  }

  private handleDoctorVerification(payload: any): void {
    this.authService.confirmDoctorEmail(payload).subscribe({
      next: (res: any) => {
        this.handleVerificationSuccess(res, '/dashboard');
      },
      error: (err: any) => {
        this.handleVerificationError(err);
      },
    });
  }

  getOtp() {
    this.#userService.getOTP(this.userData).subscribe(res => {
      // Start the 2-minute timer when OTP is requested
      this.startTimer(120); // 2 minutes = 120 seconds
    });
  }

  // Start timer with specified seconds using RxJS interval
  private startTimer(seconds: number): void {
    // Clear any existing timer subscription
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }

    this.timeLeft = seconds;
    this.#cdr.markForCheck(); 

    // Create a new timer using RxJS interval
    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.timeLeft > 0))
      .subscribe({
        next: () => {
          this.timeLeft--;
          this.#cdr.markForCheck();
          if (this.timeLeft <= 0) {
            this.#toastrService.warning(
              'Verification code has expired. Please request a new one.'
            );
            if (this.timerSubscription) {
              this.timerSubscription.unsubscribe();
              this.timerSubscription = null;
            }
          }
        },
        error: err => {
          console.error('Timer error:', err);
        },
      });
  }

  // Format time from seconds to MM:SS format
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  // Clean up timer when component is destroyed
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  get verify_code() {
    return this.form.get('verify_code');
  }
}
