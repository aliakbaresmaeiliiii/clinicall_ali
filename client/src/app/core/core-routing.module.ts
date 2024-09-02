import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmEmailComponent } from './auth/components/confirm-email/confirm-email.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';

const routes = [
  {
    path: '',
    component: LoginComponent,
    
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    // canActivate: [RegistrationGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    // canActivate: [RegistrationGuard],
  },


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
