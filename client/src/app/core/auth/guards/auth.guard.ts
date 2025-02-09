import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state): any => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (typeof localStorage !== 'undefined') {
    const userData = localStorage.getItem('userData');
    if (userData) {
      if (authService.isTokenExpired()) {
        authService.logout();
        return false;
      }
      return true;
    }

    return true;
  }
  router.navigateByUrl('auth/login');
  return false;
};
