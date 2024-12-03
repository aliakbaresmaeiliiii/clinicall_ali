import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterLink,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { LayoutSettingsComponent } from './components/layout-settings/layout-settings.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { NumberOnlyDirective } from 'ali';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { GoogleMapComponent } from '../../shared/components/google-map/google-map.component';
import { UsersSettingsComponent } from './components/users_settings/users_settings.component';
import { AddNewConnectionComponent } from './components/add-new-connection/add-new-connection.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { UserService } from '../services/user.service';
import { SharedModule } from '../../shared/shared.module';

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
    AddNewConnectionComponent
  ],
  imports: [
    CommonModule,
    NumberOnlyDirective,
    MatDividerModule,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatSelectModule,
    NgxEditorModule,
    MatIconModule,
    MatCheckboxModule,
    GoogleMapComponent,
    MatDatepickerModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[],
  providers:[AgePipe,UserService,MatDatepickerModule,]
})
export class SettingsModule {}
