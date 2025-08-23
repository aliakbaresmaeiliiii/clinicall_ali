import {
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { NgOtpInputModule } from 'ali';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    // canActivate: [AuthGuard],
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    // canActivate: [RegistrationGuard],

    // {
    //   path: 'change-password-otp',
    //   component: ChangePasswordOtpComponent,
    //   canActivate: [ChangePasswordGuard]
    // },
    // {
    //   path: 'change-password',
    //   component: ChangePasswordComponent,
    //   canActivate: [ChangePasswordGuard]
    // }
  },
];
@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    SocialLoginModule,
    NgOtpInputModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    SocialLoginModule,
    NgOtpInputModule,
  ],
  providers: [
    // ReCaptchaV3Service,
    // SocialAuthService,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     lang: 'en',
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '302618903274-6bfd6agmkoanb474m3e1ii3oc1phjl40.apps.googleusercontent.com'
    //         ),
    //       },
    //     ],
    //     onError: (err: any) => {
    //       console.error('❌❌❌', err);
    //     },
    //   } as SocialAuthServiceConfig,
    // },
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  // providers: [{provide:RECAPTCHA_V3_SITE_KEY,useValue:'6LcWrPAqAAAAAGCPuLNhdXoJ7eqaEFSjXCTjrTbn'}],
})
export class AuthModule {}
