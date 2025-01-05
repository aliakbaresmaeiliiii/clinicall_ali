import { Component, inject, OnInit, signal } from '@angular/core';
import { routes } from '../../user-profile.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  standalone: false,
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss',
})
export class ProfileLayoutComponent implements OnInit{
  username: string = '';
  userImg: any;
  focusedRoute: string | null = null;
  router = inject(Router);
  titleRoute = signal<string>('');

  settingsRoutes = routes
    .flatMap(route => route.children)
    .filter(childRoute => childRoute?.title);

    ngOnInit(): void {
    }

  trackByFn(index: number, route: any): any {
    return route.path; // or any unique identifier
  }


  setFocus(routePath: any) {
    this.focusedRoute = routePath;
    this.titleRoute.set(routePath);
  }

  toCamelCase(text: string): string {
    return text
      .toLowerCase()
      .split('-')
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  }
}
