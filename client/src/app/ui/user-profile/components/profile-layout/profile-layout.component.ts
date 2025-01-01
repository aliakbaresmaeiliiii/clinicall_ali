import { Component, inject } from '@angular/core';
import { routes } from '../../user-profile.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  standalone: false,
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss',
})
export class ProfileLayoutComponent {
  username: string = '';
  userImg: any;
  focusedRoute: string | null = null;
  router = inject(Router);

  settingsRoutes = routes
    .flatMap(route => route.children)
    .filter(childRoute => childRoute?.title);

  trackByFn(index: number, route: any): any {
    return route.path; // or any unique identifier
  }

  isRouteActive(routePath: any): boolean {
    return this.router.isActive(routePath, false);
  }
  setFocus(routePath: any) {
    this.focusedRoute = routePath;
  }
}
