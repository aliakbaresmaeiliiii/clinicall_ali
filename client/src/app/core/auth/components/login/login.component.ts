declare var google: any;
import {
  Component,
  inject,
  OnInit,
  Renderer2,
  signal
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';
import { ShareAuthService } from '../../../services/share.service';

import {
  SocialUser
} from '@abacritt/angularx-social-login';
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
    if (this.form.value) {
      let formValue = this.form.value;
      
      switch (this.selectedRole) {
        case 'clinic':
          // Clinic login with email and password
          const clinicLoginData = {
            username: formValue.email,
            password: formValue.password,
            email: formValue.email
          };
          this.#authService.clinicSignIn(clinicLoginData).subscribe({
            next: (res: any) => {
              this.storeDataUser = res;
              const dataJson = JSON.stringify(this.storeDataUser);
              localStorage.setItem('userData', dataJson);
              if (res.code === 200) {
                this.toast.success('Login successful');
                this.router.navigate(['/dashboard']);
              }
            },
            error: e => {
              // Handle unauthorized response - redirect to verify email page
              if (e.status === 401 || e.status === 403) {
                this.toast.error('Please verify your email address to continue.');
                // Store email and role for verify email page
                this.shareService.setEmail(formValue.email);
                this.shareService.setSelectedRole('clinic');
                this.router.navigate(['auth/confirm-email']);
              } else {
                this.toast.error('Login failed. Please try again.');
              }
            },
          });
          break;
        case 'doctor':
          // Doctor login with email and password
          const doctorLoginData = {
            username: formValue.email,
            password: formValue.password,
            email: formValue.email
          };
          this.#authService.doctorSignIn(doctorLoginData).subscribe({
            next: (res: any) => {
              const storeDataUser = res;
              const dataJson = JSON.stringify(storeDataUser);
              localStorage.setItem('userData', dataJson);
              if (res.code === 200) {
                this.toast.success(`You are now signed in as a ${res.email}`);
                this.router.navigate(['/dashboard']);
              }
            },
            error: e => {
              // Handle unauthorized response - redirect to verify email page
              if (e.status === 401 || e.status === 403) {
                this.toast.error('Please verify your email address to continue.');
                // Store email and role for verify email page
                this.shareService.setEmail(formValue.email);
                this.shareService.setSelectedRole('doctor');
                this.router.navigate(['auth/confirm-email']);
              } else {
                this.toast.error('Login failed. Please try again.');
              }
            },
          });
          break;
        case 'patient':
          // Patient login - passwordless (email only)
          const patientLoginData = {
            email: formValue.email
          };
          this.#authService.patientSignIn(patientLoginData).subscribe({
            next: (res: any) => {
              this.toast.success('Login link sent to your email! Please check your inbox.');
              this.router.navigate(['auth/confirm-email']);
            },
            error: e => {
              // Handle unauthorized response - redirect to verify email page
              if (e.status === 401 || e.status === 403) {
                this.toast.error('Please verify your email address to continue.');
                // Store email and role for verify email page
                this.shareService.setEmail(formValue.email);
                this.shareService.setSelectedRole('patient');
                this.router.navigate(['auth/confirm-email']);
              } else {
                this.toast.error('Failed to send login link. Please try again.');
              }
            },
          });
          break;
        default:
          this.toast.error('Invalid role selected.');
          return;
      }
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
