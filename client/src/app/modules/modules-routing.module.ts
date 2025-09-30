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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            d => d.DashboardComponent
          ),
        title: 'Dashboard',
        data: { breadcrumb: 'dashboard', icon: 'space_dashboard' },
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
          import('./doctors/doctors.module').then(d => d.DoctorsModule),
        data: { breadcrumb: 'doctors' },
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./calendar/calendar.module').then(d => d.CalendarModule),
        title: 'Schedule',
        data: { breadcrumb: 'dashboard', icon: 'calendar_today' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
