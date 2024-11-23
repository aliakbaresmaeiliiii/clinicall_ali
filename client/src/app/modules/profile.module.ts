import { NgModule } from '@angular/core';
import { TimePickerComponent } from '../shared/components/time-picker/time-picker.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DialogCalendarComponent } from './calendar/dialog-calendar/dialog-calendar.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './profile.component';
import { FilterComponent } from './users/filter/filter.component';
@NgModule({
  declarations: [ModulesComponent, DialogCalendarComponent, CalendarComponent,FilterComponent],
  imports: [ModulesRoutingModule, SharedModule, TimePickerComponent],
})
export class ModulesModule {}
