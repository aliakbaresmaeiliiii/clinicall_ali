import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareAuthService {
  storeEmail = signal<string>('');
  selectedRole = signal<string>('');

  setEmail(email: string) {
    this.storeEmail.set(email);
  }

  getEmail() {
    return this.storeEmail();
  }
  setSelectedRole(role: string) {
    this.selectedRole.set(role);
  }

  getSelectedRole() {
    return this.selectedRole();
  }
}
