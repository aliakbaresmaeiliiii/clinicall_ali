import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxEditorModule } from 'ngx-editor';
import { GoogleMapComponent } from '../../shared/components/google-map/google-map.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { UserService } from '../services/user.service';
import { AddNewConnectionComponent } from './components/add-new-connection/add-new-connection.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { LayoutSettingsComponent } from './components/layout-settings/layout-settings.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { UsersSettingsComponent } from './components/users_settings/users_settings.component';
import { RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: LayoutSettingsComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
        data: { icon: 'settings' },
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'Change Password',
        data: { icon: 'lock' },
      },
      {
        path: 'connections',
        component: ConnectionsComponent,
        title: 'Connections',
        data: { icon: 'link' },
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        title: 'Privacy Policy',
        data: { icon: 'privacy_tip' },
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent,
        title: 'Terms & Conditions',
        data: { icon: 'gavel' },
      },
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    UsersSettingsComponent,
    LayoutSettingsComponent,
    ConnectionsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    AddNewConnectionComponent,

  ],
  imports: [
    RouterOutlet,
    RouterLink,
    NgxEditorModule,
    GoogleMapComponent,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    AsyncPipe,
    

  ],
  exports: [GoogleMapComponent],
  providers: [AgePipe, UserService, MatDatepickerModule],
})
export class SettingsModule {}
