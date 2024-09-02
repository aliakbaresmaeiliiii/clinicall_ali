import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/layouts/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: null },
    children: [
      {
        path: 'dashboard',
        loadComponent:()=>import('./dashboard/dashboard.component').then(d=>d.DashboardComponent),
        title: 'Dashboard',
        data: { breadcrumb: 'dashboard', icon: 'space_dashboard' },
      },
      {
        path: 'dashboard/doctor-dashboard',
        loadComponent:()=>import('./doctor-dashboard/doctor-dashboard.component').then(d=>d.DoctorDashboardComponent),
        title: 'Dashboard',
        data: { breadcrumb: 'dashboard', icon: 'dashboard' },
      },
      {
        path: 'users',
        loadComponent:()=>import('./users/components/users.component').then(d=>d.UsersComponent),
        title: 'Users',
        data: { breadcrumb: 'dashboard', icon: 'people' },
      },
      {
        path: 'schedule',
        loadComponent:()=>import('./calendar/calendar.component').then(d=>d.CalendarComponent),
        title: 'Schedule',
        data: { breadcrumb: 'dashboard', icon: 'calendar_today' },
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('../core/settings/settings.module').then(
            s => s.SettingsModule
          ),
        data: { breadcrumb: 'settings' },
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./patients/patients.module').then(p => p.PatientsModule),
        data: { breadcrumb: 'patients' },
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctors/doctors.module').then(p => p.DoctorsModule),
        data: { breadcrumb: 'doctors' },
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
