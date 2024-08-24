import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): any => {
  const router = inject(Router);
  if (typeof localStorage !== 'undefined') {
    const getStoreItem = localStorage.getItem('storeUser');
    const getItem = JSON.parse(getStoreItem || '{}');
    if (getItem) {
      return getItem;
    } else {
      router.navigateByUrl('/login')
      return false;
    }
  }
}