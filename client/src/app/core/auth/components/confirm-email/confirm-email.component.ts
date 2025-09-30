import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay, EMPTY, of, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { ShareAuthService } from '../../../services/share.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: false,
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  #userService = inject(UserService);
  authService = inject(AuthService);
  #toastrService = inject(ToastrService);
  #shareSerivce = inject(ShareAuthService);
  matcher = new ErrorStateMatcher();
  userData: any;
  form!: FormGroup;
  #router = inject(Router);
  otp!: string;
  showOtpComponent = true;
  selectedRole: string = '';
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

    this.userData = this.#shareSerivce.getEmail();
    this.selectedRole = this.#shareSerivce.getSelectedRole();
    
    console.log('User data:', this.userData, 'Role:', this.selectedRole);
    console.log('OTP Config:', this.config);
    
    // If user came from login (unauthorized), automatically resend verification code
    if (this.userData && this.selectedRole) {
      this.getOtp();
    }
  }
  onOtpChange(otp: any) {

    this.otp = otp.event.value;
    console.log('OTP changed:', otp);

    if (this.otp.length === this.config.length) {
      this.onSubmit();
    }
  }

  toggleOtpComponent() {
    this.showOtpComponent = !this.showOtpComponent;
    console.log('OTP component toggled:', this.showOtpComponent);
  }

  loginSuccess() {
    localStorage.setItem('isAuthenticated', 'true'); // Set login flag
    this.#router.navigate(['aliakbar']).then(() => {
      window.history.replaceState({}, '', 'aliakbar'); // Remove previous history
    });
  }
  onSubmit() {
    const payload = {
      email: this.userData,
      verifyCode: this.otp,
    };

    let confimrEmail$;
    let redirectRoute = '';

    if (this.selectedRole === 'clinic') {
      confimrEmail$ = this.authService.confirmClinicEmail(payload);
      redirectRoute = '/dashboard';
    } else if (this.selectedRole === 'patient') {
      confimrEmail$ = this.authService.confirmPatientEmail(payload);
      redirectRoute = '/home';
    } else if (this.selectedRole === 'doctor') {
      confimrEmail$ = this.authService.confirmDoctorEmail(payload);
      redirectRoute = '/dashboard';
    } else {
      this.#toastrService.error('invalid role selected');
      return;
    }

    confimrEmail$
      .pipe(
        switchMap((res: any) => {
          if (res) {
            // Store user data in localStorage
            const dataJson = JSON.stringify(res);
            localStorage.setItem('userData', dataJson);
            localStorage.setItem('isAuthenticated', 'true');
            
            this.#toastrService.success('Email verified successfully! Welcome to Clinical Ali.');
            this.#router.navigate([redirectRoute]);
            return of(res);
          }
          throw new Error('Invalid response');
        }),
        catchError(err => {
          this.#toastrService.error('Email verification failed. Please check your code and try again.');
          return EMPTY; 
        })
      )
      .subscribe();
  }

  getOtp() {
    this.#userService.getOTP(this.userData).subscribe(res => {});
  }
  get verify_code() {
    return this.form.get('verify_code');
  }
}
