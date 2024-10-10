import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NavItem } from '../../shared/models/nav-items';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavItemsService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;

  constructor() {}

  getNavItems(): Observable<NavItem[]> {
    return this.#http.get<NavItem[]>(`${this.config}navItem`);
  }

  getSubmenuItems(menuId: number): Observable<any> {
    return this.#http.get<NavItem>(`${this.config}submenu/${menuId}`);
  }
}
