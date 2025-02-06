import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ui/ui.module').then(u => u.UiModule),
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(a => a.AuthModule),
  },
  {
    path: 'aliakbar',
    loadChildren: () =>
      import('./modules/profile.module').then(m => m.ModulesModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'aliakbar' },
  },
  {
    path: 'not found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not found',
  },
];
