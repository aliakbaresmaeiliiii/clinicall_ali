import { Component } from '@angular/core';
import { UsersSettingsComponent } from '../users_settings/users_settings.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-settings',
  standalone: true,
  imports: [UsersSettingsComponent, RouterOutlet],
  templateUrl: './layout-settings.component.html',
  styleUrl: './layout-settings.component.scss',
})
export class LayoutSettingsComponent {}
