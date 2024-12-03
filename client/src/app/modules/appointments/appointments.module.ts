import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './components/appointments.component';

export const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
    data: { breadcrumb: 'appointments' },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppointmentsModule {}
