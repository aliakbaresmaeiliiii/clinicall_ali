import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Check if localStorage is available (for SSR compatibility)
  if (typeof localStorage === 'undefined') {
    router.navigate(['/auth/login']);
    return false;
  }

  const userData = localStorage.getItem('userData');
  
  // If no user data, redirect to login
  if (!userData) {
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    const parsedUserData = JSON.parse(userData);
    
    // Check if token exists and is not expired
    if (!parsedUserData.token || authService.isTokenExpired()) {
      authService.logout();
      return false;
    }

    // Check if user is verified (for patient routes)
    if (route.routeConfig?.path?.startsWith('patient/') && !parsedUserData.isVerified) {
      router.navigate(['/auth/confirm-email']);
      return false;
    }

    return true;
  } catch (error) {
    // Invalid user data format
    authService.logout();
    return false;
  }
};
