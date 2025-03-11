import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';
import { NgOtpInputModule } from 'ali';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';

const routes = [
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
    RouterLink,
    MatIconModule,
    MatCheckboxModule,
    SocialLoginModule,
    NgOtpInputModule,
    RecaptchaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatIconModule,
    MatCheckboxModule,
    SocialLoginModule,
    NgOtpInputModule,
  ],
  providers: [{provide:RECAPTCHA_V3_SITE_KEY,useValue:'6LcWrPAqAAAAAGCPuLNhdXoJ7eqaEFSjXCTjrTbn'}],
})
export class AuthModule {}
