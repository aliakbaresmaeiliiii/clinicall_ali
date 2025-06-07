import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { groupBy } from 'lodash-es';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { BreadCrumbComponent } from '../../../shared/components/bread-crumb/bread-crumb.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { User } from '../../auth/models/user';
import { NavItemsService } from '../../services/nav-items.service';
import { PermissionService } from '../../services/permission.service';
import { HeaderComponent } from '../header/header.component';
import { Menu } from '../types/navItem';
import { MenuIconComponent } from './menu-icon/menu-icon.component';
@Component({
  selector: 'side-bar',
  imports: [
    CommonModule,
    MatMenuModule,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
    AsyncPipe,
    RouterLinkActive,
    MatTooltipModule,
    MatExpansionModule,
    LoaderComponent,
    BreadCrumbComponent,
    MenuIconComponent,
    RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  animations: [
    trigger('iconRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(90deg)' })),
      transition('collapsed <=> expanded', animate('50ms ease-in-out')),
    ]),
  ],
})
export class SideBarComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  permissionService = inject(PermissionService);
  hasAccess: boolean = false;
  readonly sidenav = viewChild.required(MatSidenav);
  isMobile = true;
  isCollapsed = true;
  groupedData: { [key: string]: Menu[] } = {};
  expandedMenus: { [key: string]: boolean } = {};
  private ngUnsubscribe: Subject<any> = new Subject();
  username!: User;
  private breakpointObserver = inject(BreakpointObserver);
  navService = inject(NavItemsService);
  observer = inject(BreakpointObserver);
  userImg: any;
  focusedRoute: string | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.getNavItems();
  }

  getFirstWord(username: string): string {
    return username.charAt(0);
  }

  toggleSubmenu(index: any) {
    if (index.path === '') {
      this.expandedMenus[index] = !this.expandedMenus[index];
    } else {
      this.router.navigate([index.path]);
      this.setFocus(index.path);
    }
  }

  toggleMenu(data: any) {
    if (data.path === '') {
      this.expandedMenus[data.id] = !this.expandedMenus[data.id];
    } else {
      this.router.navigate([data.path]);
      this.setFocus(data.path);
    }
  }

  getNavItems() {
    this.navService.getNavItems().subscribe({
      next: (res: any) => {
        this.groupedData = this.groupByMenu(res.data, 'name');
      },
      error: e => console.error(e),
      complete: () => {},
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  groupByMenu(data: Menu[], key: string) {
    return groupBy(data, key);
  }

  getMenuNames() {
    return this.groupedData ? Object.keys(this.groupedData) : [];
  }

  trackByIndex(index: number) {
    return index;
  }

  trackByItem(index: number, item: any) {
    return item.id;
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  toggleMenuItem(menuName: string) {
    const sub = this.groupedData[menuName][0].submenus;
    const path = this.groupedData[menuName][0].path;
    if (sub) {
      this.expandedMenus[menuName] = !this.expandedMenus[menuName];
      this.router.navigate([path]);
    } else {
    }
  }

  isMenuItemExpanded(menuName: string): boolean {
    return !!this.expandedMenus[menuName];
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus[menuId];
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('userData');
    localStorage.clear();
    sessionStorage.clear();

    this.permissionService.clearPermissions();
  }

  isRouteActive(routePath: any) {
    const isActive = this.router.isActive(routePath, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  setFocus(routePath: any) {
    this.focusedRoute = routePath;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
