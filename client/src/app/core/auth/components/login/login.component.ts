import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Renderer2,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { PermissionService } from '../../../services/permission.service';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
  AnimationEvent

} from '@angular/animations';

// Client ID
// 302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com

// Client secret
// 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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    RouterModule,
    MatCheckboxModule,
    SocialLoginModule,
  ],
  providers: [
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
        onError: err => {
          console.error('❌❌❌', err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  title: string = 'Angular';
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  form!: FormGroup;
  role!: string;
  user!: SocialUser;
  loggedIn!: boolean;

  #router = inject(Router);
  #authService = inject(AuthService);
  authService = inject(SocialAuthService);
  permissionService = inject(PermissionService);
  renderer = inject(Renderer2);
  protected wobbleField = false;
  private themeManager = inject(ThemeManagerService);
  theme = this.themeManager.theme;
  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remmeber: new FormControl(false),
    });
  }
  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.createForm();
    // this.authService.authState.subscribe(user => {
    //   this.user = user;
    //   this.login();
    // });
  }


  login(event: AnimationEvent) {
    // this.form.events
    // .pipe(filter(event => event instanceof TouchEvent))
    // .subscribe(event => {});
  
    if (this.form.value) {
      this.#authService.signIn(this.form.value).subscribe((res: any) => {
        this.permissionService.setPermissions(res.data.permissions);
        const stroeDataUser = res.data;
        const dataJson = JSON.stringify(stroeDataUser);
        localStorage.setItem('userData', dataJson);
        this.#router.navigate(['aliakbar/settings']);
      });
    }
  }

  navigateRegister() {
    this.#router.navigate(['auth/register']);
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
