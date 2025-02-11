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
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
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

    this.userData = this.#shareSerivce.getEmail();
    this.selectedRole = this.#shareSerivce.getSelectedRole();
  }
  onOtpChange(otp: any) {
    this.otp = otp;

    if (this.otp.length === this.config.length) {
      this.onSubmit();
    }
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
      verify_code: this.otp,
    };

    let confimrEmail$;
    let redirectRoute = '';

    if (this.selectedRole === 'clinic') {
      confimrEmail$ = this.authService.confirmClinicEmail(payload);
      redirectRoute = '/dashobard';
    } else if (this.selectedRole === 'patient') {
      confimrEmail$ = this.authService.confirmPatientEmail(payload);
      redirectRoute = 'auth/login';
    } else {
      this.#toastrService.error('invalid role selected');
      return;
    }

    confimrEmail$
      .pipe(
        switchMap((res: any) => {
          if (res) {
            this.#toastrService.success('login successfull');
            this.#router.navigate([redirectRoute]);
            return of(res);
          }
          throw new Error('Invalid response');
        }),
        catchError(err => {
          this.#toastrService.error('Login failed. Please try again.');
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
