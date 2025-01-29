declare var google: any;
import {
  Component,
  inject,
  OnInit,
  Renderer2
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';

import { SocialUser } from '@abacritt/angularx-social-login';
import { AnimationEvent } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../../services/permission.service';

// Client ID
// 302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com

// Client secret
// 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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  // providers: [
  //   SocialAuthService,
  //   {
  //     provide: 'SocialAuthServiceConfig',
  //     useValue: {
  //       autoLogin: false,
  //       lang: 'en',
  //       providers: [
  //         {
  //           id: GoogleLoginProvider.PROVIDER_ID,
  //           provider: new GoogleLoginProvider(
  //             '302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com'
  //           ),
  //         },
  //       ],
  //       onError: err => {
  //         console.error('❌❌❌', err);
  //       },
  //     } as SocialAuthServiceConfig,
  //   },
  // ],
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  #authService = inject(AuthService);
  permissionService = inject(PermissionService);
  toast = inject(ToastrService);
  renderer = inject(Renderer2);
  matcher = new ErrorStateMatcher();
  private themeManager = inject(ThemeManagerService);

  title: string = 'Angular';
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  form!: FormGroup;
  role!: string;
  user!: SocialUser;
  loggedIn!: boolean;
  protected wobbleField = false;
  theme = this.themeManager.theme;

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

  refreshToken(): void {
    // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.createForm();

    // google.accounts.id.initialize({
    //   client_id:
    //     '940657570058-gpm7buu1t25nlls0pcbs95c6t2bf4rg4.apps.googleusercontent.com',
    //   callback: (resp: any) => {
    //   console.log('resposend',resp);

    //    this.handleLogin(resp)
    //   },
    // });
    // google.accounts.id.renderButton(document.getElementById('google-btn'), {
    //   theme: 'filled_blue',
    //   size: 'large',
    //   shape: 'rectangle',
    // });
  }

  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response && response.credential) {
      // Decode the token
      const payload = this.decodeToken(response.credential);
      console.log('payload', payload);

      // Store in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));

      // Navigate to home
      this.router.navigate(['aliakbar/dashboard']);
    } else {
      console.error('Invalid response or missing credential');
    }
  }

  // ****login Google
  login() {
    if (this.form.value) {
      this.#authService.signIn(this.form.value).subscribe({
        next: (res: any) => {
          // this.permissionService.setPermissions(res.data.permissions);
          const stroeDataUser = res;
          const dataJson = JSON.stringify(stroeDataUser);
          localStorage.setItem('userData', dataJson);
          debugger;
          if (res.code === 200) {
            this.toast.success('login is successfully');
            this.router.navigate(['aliakbar']);
          }
        },
        error: e => {
          this.toast.error(`${e}`);
        },
      });
    }
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
}
