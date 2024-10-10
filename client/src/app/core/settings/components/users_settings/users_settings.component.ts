import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { routes } from '../../settings.module';

@Component({
  selector: 'app-users_settings',
  templateUrl: './users_settings.component.html',
  styleUrl: './users_settings.component.scss',
})
export class UsersSettingsComponent extends BaseComponent implements OnInit {
  temp: any;
  userImg: any;
  username: string='';
  focusedRoute: string | null = null;
  // settingsRoutes = routes.filter(r => r.path);
  settingsRoutes = routes
    .flatMap(route => route.children)
    .filter(childRoute => childRoute?.title);

  constructor() {
    super();
  }
  ngOnInit(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    // const getUserInfo = loggedInUser ? JSON.parse(loggedInUser) : null;
    // this.userImg = getUserInfo?.picture;
    // this.username = getUserInfo.name;
  }
  isRouteActive(routePath: any): boolean {
    return this.router.isActive(routePath, false);
  }

  trackByFn(index: number, route: any): any {
    return route.path; // or any unique identifier
  }

  setFocus(routePath: any) {
    this.focusedRoute = routePath;
  }


}
