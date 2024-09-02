import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissions: Set<string> = new Set();
  constructor() {
    this.loadPermissionsFromStorage();
  }

  setPermissions(permissionsArray: string[]): void {
    this.permissions = new Set(permissionsArray);
    this.savePermissionsToStorage();
  }

  hasPermission(permission: string): boolean {
    return this.permissions.has(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.permissions.has(permission));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(permissions => this.permissions.has(permissions));
  }

  private savePermissionsToStorage(): void {
    localStorage.setItem(
      'userPermissions',
      JSON.stringify(Array.from(this.permissions))
    );
  }
  loadPermissionsFromStorage(): void {
    const storedPermissions = localStorage.getItem('userPermissions');
    if (storedPermissions) {
      this.permissions = new Set(JSON.parse(storedPermissions));
    }
  }

  clearPermissions(): void {
    this.permissions.clear();
    localStorage.removeItem('userPermissions');
  }
}
