declare var google: any;
import { Component, inject, OnInit, Renderer2, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';
import { ShareAuthService } from '../../../services/share.service';

import { SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PermissionService } from '../../../services/permission.service';
// Client ID
// 302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com

// Client secret
// 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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  #authService = inject(AuthService);
  permissionService = inject(PermissionService);
  toast = inject(ToastrService);
  renderer = inject(Renderer2);
  shareService = inject(ShareAuthService);
  matcher = new ErrorStateMatcher();
  private themeManager = inject(ThemeManagerService);
  selectedRole: string = '';
  private destroy$ = new Subject<void>();
  successCaptcha = signal<boolean>(false);
  patientInfo = signal<any[]>([]);

  labelUserName: string = 'Email Address';
  labelPassword: string = 'Password';
  form!: FormGroup;
  role!: string;
  user!: SocialUser;
  loggedIn!: boolean;
  protected wobbleField = false;
  theme = this.themeManager.theme;
  title = signal<string>('');
  storeDataUser: any;
  isLoading = signal<boolean>(false);
  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      remmeber: new FormControl(false),
    });
  }
  setRole(role: string) {
    this.selectedRole = role;
    this.title.set(role);

    // Update password validation based on role
    const passwordControl = this.form?.get('password');
    if (passwordControl) {
      if (role === 'patient') {
        passwordControl.clearValidators();
        passwordControl.setValue(''); // Clear password for patients
      } else {
        passwordControl.setValidators([Validators.required]);
      }
      passwordControl.updateValueAndValidity();
    }
  }

  refreshToken(): void {
    // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    // this.recaptchaV3Service.execute('homepage').subscribe(token => {
    //   console.log('reCAPTCHA token:', token);
    // });

    const userDataString = localStorage.getItem('patientInfo');
    if (userDataString) {
      const getPatientInfoStore = JSON.parse(userDataString);
      this.patientInfo.set(getPatientInfoStore);
    }
    this.setRole('clinic');

    this.createForm();

    google.accounts.id.initialize({
      client_id:
        '940657570058-gpm7buu1t25nlls0pcbs95c6t2bf4rg4.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLogin(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
    });
  }

  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response && response.credential) {
      // Decode the token
      const payload = this.decodeToken(response.credential);
      // Store in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));

      // Navigate to home
      this.router.navigate(['dashboard']);
    } else {
      console.error('Invalid response or missing credential');
    }
  }

  login() {
    if (this.form.value && !this.isLoading()) {
      const formValue = this.form.value;
      this.isLoading.set(true);
      this.handleRoleBasedLogin(formValue);
    }
  }

  private handleRoleBasedLogin(formValue: any): void {
    switch (this.selectedRole) {
      case 'patient':
        this.handlePatientLogin(formValue);
        break;
      case 'clinic':
        this.handleClinicLogin(formValue);
        break;
      case 'doctor':
        this.handleDoctorLogin(formValue);
        break;
      default:
        this.toast.error('Invalid role selected.');
        break;
    }
  }

  private handlePatientLogin(formValue: any): void {
    const patientLoginData = {
      email: formValue.email,
    };

    this.#authService.patientSignIn(patientLoginData).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        if (res.code === 200 || res.statusCode === 200) {
          // Check if user is verified before allowing login
          // Handle different possible locations for isVerified field
          const isVerified = res.data.user.isVerified;

          if (isVerified) {
            this.handleLoginSuccess(res, '', 'Login successful');
          } else {
            this.handleUnverifiedEmail(formValue.email, 'patient');
          }
        } else {
          this.handleUnverifiedEmail(formValue.email, 'patient');
        }
      },
      error: (e: any) => {
        this.isLoading.set(false);
        this.handleLoginError(e, formValue.email, 'patient');
      },
    });
  }

  private handleClinicLogin(formValue: any): void {
    const clinicLoginData = {
      username: formValue.email,
      password: formValue.password,
      email: formValue.email,
    };

    this.#authService.clinicSignIn(clinicLoginData).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        this.storeDataUser = res;
        const dataJson = JSON.stringify(this.storeDataUser);
        localStorage.setItem('userData', dataJson);
        if (res.statusCode === 200) {
          // Check if user is verified before allowing login
          // Handle different possible locations for isVerified field
          const isVerified = res.data.user.isVerified;
          if (isVerified) {
            this.handleLoginSuccess(res, '/dashboard', 'Login successful');
          } else {
            this.handleUnverifiedEmail(formValue.email, 'clinic');
          }
        }
      },
      error: (e: any) => {
        this.isLoading.set(false);
        this.handleLoginError(e, formValue.email, 'clinic');
      },
    });
  }

  private handleDoctorLogin(formValue: any): void {
    const doctorLoginData = {
      username: formValue.email,
      password: formValue.password,
      email: formValue.email,
    };

    this.#authService.doctorSignIn(doctorLoginData).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        const storeDataUser = res;
        const dataJson = JSON.stringify(storeDataUser);
        localStorage.setItem('userData', dataJson);
        if (res.code === 200) {
          // Check if user is verified before allowing login
          // Handle different possible locations for isVerified field
          const isVerified =
            res.isVerified ||
            res.is_verified ||
            res.data?.isVerified ||
            res.data?.is_verified;

          if (isVerified) {
            this.handleLoginSuccess(
              res,
              '/dashboard',
              `You are now signed in as a ${res.email}`
            );
          } else {
            this.handleUnverifiedEmail(formValue.email, 'doctor');
          }
        }
      },
      error: (e: any) => {
        this.isLoading.set(false);
        this.handleLoginError(e, formValue.email, 'doctor');
      },
    });
  }

  private handleLoginSuccess(
    res: any,
    redirectRoute: string,
    message: string
  ): void {
    // Ensure verification status is properly included in stored data

    const userDataToStore = {
      ...res,
    };

    const dataJson = JSON.stringify(userDataToStore);
    localStorage.setItem('userData', dataJson);
    localStorage.setItem('isAuthenticated', 'true');
    this.toast.success(message);
    this.router.navigate([redirectRoute]);
  }

  private handleUnverifiedEmail(email: string, role: string): void {
    this.toast.error('Please verify your email address to continue.');
    this.shareService.setEmail(email);
    this.shareService.setSelectedRole(role);
    this.router.navigate(['auth/confirm-email']);
  }

  private handleLoginError(error: any, email: string, role: string): void {
    if (error.status === 401 || error.status === 403) {
      this.handleUnverifiedEmail(email, role);
    } else {
      this.toast.error('Login failed. Please try again.');
    }
  }

  resolved(captchaResponse: any) {
    console.log(`Captcha resolved with response: ${captchaResponse}`);
    // Send token to backend for verification
    this.#authService.verifyCaptcha(captchaResponse).subscribe(res => {
      this.successCaptcha.set(res.success);

      console.log('from captcha', res);
    });
  }

  navigateRegister() {
    this.router.navigate(['auth/register']);
  }

  onAdminRol(data: string) {
    this.role = data;
  }
  onDoctorRol(data: string) {}
  onPatientRol(data: string) {}
  // Get Value Form For Validation
  get email() {
    return this.form?.get('email');
  }
  get password() {
    return this.form?.get('password');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
