import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state): any => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    const getStoreItem = localStorage.getItem('userData');
    if (getStoreItem) {
      const getItem = JSON.parse(getStoreItem);

      if (Object.keys(getItem).length > 0) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false; // localStorage is not available, redirect to login
  }
};
