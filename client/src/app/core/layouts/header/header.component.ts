import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ThemeManagerService } from '../../../shared/client-services/theme-manager.service';
import { MyErrorStateMatcher } from '../../../shared/input-validation/input-validation';
@Component({
    selector: 'app-header',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDividerModule,
        RouterLink,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatBadgeModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  readonly onToggleMenu = output<any>();
  matcher = new MyErrorStateMatcher();
  today: number = Date.now();
  router = inject(Router);
  imageUser: any;
  showLng: any;
  username: string = '';
  languages = [
    { name: 'ENG', flag: 'assets/flags/ad.svg' },
    { name: 'CA', code: 'ca', flag: 'assets/flags/ca.svg' },
    { name: 'UK', flag: 'assets/flags/gb.svg' },
    { name: 'FR', flag: 'assets/flags/fr.svg' },
    { name: 'DE', flag: 'assets/flags/de.svg' },
    // add more countries as needed
  ];

  private themeManager = inject(ThemeManagerService);
  theme = this.themeManager.theme;
  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  ngOnInit(): void {
    this.showLng = this.languages.find(lng => lng.name === 'ENG');
    const loggedInUser = localStorage.getItem('userData');
    const getUserInfo = loggedInUser ? JSON.parse(loggedInUser) : null;
    this.imageUser = getUserInfo?.picture;
    this.username = getUserInfo.name;

    this.getUserData();
  }

  getUserData() {
    // if (typeof localStorage !== 'undefined') {
    //   let ali = localStorage.getItem('userData');
    //   if (ali) {
    //     this.username = JSON.parse(ali);
    //   }
    // }
  }

  selectedCountry(lng: any) {
    this.showLng = lng;
  }
  toggleSide(event: Event) {
    this.onToggleMenu.emit(event);
  }

  logout() {
    this.router.navigate(['auth/login']);
    localStorage.removeItem('userData');
    localStorage.clear();
    sessionStorage.clear();
  }
}
