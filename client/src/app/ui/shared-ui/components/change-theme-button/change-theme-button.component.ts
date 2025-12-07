import { Component, inject } from '@angular/core';
import { ThemeManagerService } from '../../../../shared/client-services/theme-manager.service';

@Component({
  selector: 'app-change-theme-button',
  imports: [],
  templateUrl: './change-theme-button.component.html',
  styleUrl: './change-theme-button.component.scss'
})
export class ChangeThemeButtonComponent {
  private themeManager = inject(ThemeManagerService);

  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeManager.theme() === 'blue-dark';
  }
}
