import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { LayoutSettingsComponent } from './components/layout-settings/layout-settings.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';

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
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
