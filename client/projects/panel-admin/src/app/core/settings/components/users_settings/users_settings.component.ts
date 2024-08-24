import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ConnectionsComponent } from '../connections/connections.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { SettingsComponent } from '../settings/settings.component';
import { routes } from '../../settings.module';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-users_settings',
  standalone: true,
  imports: [
    MatDividerModule,
    RouterLink,
    RouterOutlet,
    SettingsComponent,
    ChangePasswordComponent,
    CommonModule,
    ConnectionsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    MatCardModule
  ],

  templateUrl: './users_settings.component.html',
  styleUrl: './users_settings.component.scss',
})
export class UsersSettingsComponent extends BaseComponent implements OnInit {
  temp: any;
  // settingsRoutes = routes.filter(r => r.path);
  settingsRoutes = routes
    .flatMap(route => route.children)
    .filter(childRoute => childRoute?.title);

  constructor() {
    super();
  }
  ngOnInit(): void {
    
  }
  isRouteActive(routePath: any): boolean {
    return this.router.isActive(routePath, false);
  }

  trackByFn(index: number, route: any): any {
    return route.path; // or any unique identifier
  }
}
