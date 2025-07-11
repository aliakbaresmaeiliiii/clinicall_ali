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
<<<<<<< HEAD
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctors/doctors.module').then(d => d.DoctorsModule),
        data: { breadcrumb: 'doctors' },
      },
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      // children: [
      //   // {
      //   //   path: '',
      //   //   loadComponent: () =>
      //   //     import('./dashboard/dashboard.component').then(
      //   //       d => d.DashboardComponent
      //   //     ),
      //   //   title: 'Dashboard',
      //   //   data: { breadcrumb: 'dashboard', icon: 'space_dashboard' },
      //   // },

      //   {
      //     path: 'dashboard/doctor-dashboard',
      //     loadComponent: () =>
      //       import('./doctor-dashboard/doctor-dashboard.component').then(
      //         d => d.DoctorDashboardComponent
      //       ),
      //     title: 'Dashboard',
      //     data: { breadcrumb: 'dashboard', icon: 'dashboard' },
      //   },
      //   {
      //     path: 'users',
      //     loadComponent: () =>
      //       import('./users/components/users.component').then(
      //         d => d.UsersComponent
      //       ),
      //     title: 'Users',
      //     data: { breadcrumb: 'dashboard', icon: 'people' },
      //   },
<<<<<<< HEAD
        {
          path: 'schedule',
          loadChildren: () =>
            import('./calendar/calendar.module').then(d => d.CalendarModule),
          title: 'Schedule',
          data: { breadcrumb: 'dashboard', icon: 'calendar_today' },
        },
=======
      //   {
      //     path: 'schedule',
      //     loadChildren: () =>
      //       import('./calendar/calendar.module').then(d => d.CalendarModule),
      //     title: 'Schedule',
      //     data: { breadcrumb: 'dashboard', icon: 'calendar_today' },
      //   },
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

      //   {
      //     path: 'settings',
      //     loadChildren: () =>
      //       import('../core/settings/settings.module').then(
      //         s => s.SettingsModule
      //       ),
      //     data: { breadcrumb: 'settings' },
      //   },

      //   {
      //     path: 'doctors',
      //     loadChildren: () =>
      //       import('./doctors/doctors.module').then(p => p.DoctorsModule),
      //     data: { breadcrumb: 'doctors' },
      //   },
      //   {
      //     path: 'prescribe-medication',
      //     loadChildren: () =>
      //       import('./prescribe-medication/prescribe-medication.module').then(
      //         p => p.PrescribeMedicationModule
      //       ),
      //     data: { breadcrumb: 'doctors' },
      //   },
      //   {
      //     path: 'appointments',
      //     loadChildren: () =>
      //       import('./appointments/appointments.module').then(
      //         p => p.AppointmentsModule
      //       ),
      //     data: { breadcrumb: 'appointments' },
      //   },

      //   {
      //     path: '**',
      //     redirectTo: 'dashboard',
      //   },
      // ],
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
