import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CalendarComponent } from './calendar.component';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    data: { breadcrumb: 'calendar' },
  },
];
@NgModule({
  declarations: [CalendarComponent, DialogCalendarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CalendarModule {}
