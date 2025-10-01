import { Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ui/ui.module').then(u => u.UiModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then(a => a.AuthModule),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./modules/patients/patients.module').then(p => p.PatientsModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'patient' },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/profile.module').then(m => m.ModulesModule),
    canActivate: [AuthGuard],
    data: { breadcrumb: 'dashboard' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
