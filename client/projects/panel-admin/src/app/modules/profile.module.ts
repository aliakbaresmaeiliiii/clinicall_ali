import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DialogCalendarComponent } from './calendar/dialog-calendar/dialog-calendar.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './profile.component';
import { TimePickerComponent } from '../shared/components/time-picker/time-picker.component';
@NgModule({
  declarations: [ModulesComponent, DialogCalendarComponent, CalendarComponent],
  imports: [ModulesRoutingModule, SharedModule, TimePickerComponent],
})
export class ModulesModule {}
