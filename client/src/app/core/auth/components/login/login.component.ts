declare var google: any;
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
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
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';
import { AuthService } from '../../../services/auth.service';

import {
  GoogleLoginProvider,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AnimationEvent } from '@angular/animations';
import { PermissionService } from '../../../services/permission.service';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  router = inject(Router);
  #authService = inject(AuthService);
  permissionService = inject(PermissionService);
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
    return JSON.parse(atob(token.split(".")[1]));
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
  login(event: AnimationEvent) {
    if (this.form.value) {
      this.#authService.signIn(this.form.value).subscribe((res: any) => {
        this.permissionService.setPermissions(res.data.permissions);
        const stroeDataUser = res.data;
        console.log(res.data.roles[0]);
        
        const dataJson = JSON.stringify(stroeDataUser);
        localStorage.setItem('userData', dataJson);
        if(res.data.roles[0] === 'user'){
          debugger;
          this.router.navigate(['']);
        }else{
          // this.router.navigate(['aliakbar/settings']);
        }
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
