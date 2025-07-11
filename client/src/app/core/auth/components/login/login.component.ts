declare var google: any;
import {
  Component,
  inject,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AnimationEvent } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../../services/permission.service';
import { Subject, takeUntil } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ReCaptcha2Component } from 'ngx-captcha';
// Client ID
// 302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com

// Client secret
// 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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  providers: [
    ReCaptchaV3Service,
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err: any) => {
          console.error('❌❌❌', err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  #authService = inject(AuthService);
  permissionService = inject(PermissionService);
  toast = inject(ToastrService);
  recaptchaV3Service = inject(ReCaptchaV3Service);
  renderer = inject(Renderer2);
  matcher = new ErrorStateMatcher();
  private themeManager = inject(ThemeManagerService);
  selectedRole: string = '';
  private destroy$ = new Subject<void>();
  successCaptcha = signal<boolean>(false);

  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
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
      password: new FormControl('', Validators.required),
      remmeber: new FormControl(false),
    });
  }
  setRole(role: string) {
    this.selectedRole = role;
    this.title.set(role);
  }

  refreshToken(): void {
    // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.recaptchaV3Service.execute('homepage').subscribe(token => {
      console.log('reCAPTCHA token:', token);
    });
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
          this.#authService.clinicSignIn(formValue).subscribe({
            next: (res: any) => {
              // this.permissionService.setPermissions(res.data.permissions);
              this.storeDataUser = res;
              const dataJson = JSON.stringify(this.storeDataUser);
<<<<<<< HEAD
              console.log(res);
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
              localStorage.setItem('userData', dataJson);
              if (res.code === 200) {
                this.toast.success('login is successfully');
                this.router.navigate(['/dashboard']);
              }
            },
            error: e => {
              if (e) {
                this.router.navigate(['auth/confirm-email']);
                this.storeDataUser;
                const email = localStorage.getItem('emailClinic');
                if (email) {
                  this.#authService.fetchConfirmCode(email).subscribe(res => {
                    if (res) {
                      this.router.navigate(['/dashboard']);
                    }
                  });
                }
              }
            },
          });
          break;
        case 'doctor':
          this.#authService.doctorSignIn(formValue).subscribe({
            next: (res: any) => {
              // this.permissionService.setPermissions(res.data.permissions);
              const storeDataUser = res;
              const dataJson = JSON.stringify(storeDataUser);
              localStorage.setItem('userData', dataJson);
              if (res.code === 200) {
                this.toast.success(`You are now sign in as a ${res.email}`);
                this.router.navigate(['/dashboard']);
              }
            },
            error: e => {
              if (e) {
                this.router.navigate(['auth/confirm-email']);
                this.storeDataUser;
                const email = localStorage.getItem('emailClinic');
                if (email) {
                  this.#authService.fetchConfirmCode(email).subscribe(res => {
                    if (res) {
                      this.router.navigate(['/dashboard']);
                    }
                  });
                }
              }
            },
          });
          break;
        case 'patient':
          this.#authService.patientSignIn(formValue).subscribe({
            next: (res: any) => {
              // this.permissionService.setPermissions(res.data.permissions);
              const storeDataUser = res;
              const dataJson = JSON.stringify(storeDataUser);
              localStorage.setItem('userData', dataJson);
              if (res.code === 200) {
                if(this.successCaptcha()){
                  this.toast.success('login is successfully');
                  this.router.navigate(['']);
                }else{
                  this.toast.error('Captcha verification failed. Please try again.');
                }
              }
            },
            error: e => {
              // this.toast.error(`${e}`);
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
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
