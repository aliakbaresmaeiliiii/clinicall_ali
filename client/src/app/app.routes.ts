import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { HomeComponent } from './ui/home/home.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   loadChildren: () => import('./ui/ui.module').then(u => u.UiModule),
  // },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/core.module').then(c => c.CoreModule),
  },
  {
    path: 'aliakbar',
    loadChildren: () =>
      import('./modules/profile.module').then(m => m.ModulesModule),
    canActivate: [authGuard],
    data: { breadcrumb: 'aliakbar' },
  },
  {
    path: 'not found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not found',
  },
];
