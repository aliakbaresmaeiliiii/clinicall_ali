import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { CustomTabComponent } from '../../shared/components/custom-tab/custom-tab.component';
import { AliSelectComponent } from '../../shared/components/select/ali-select/ali-select.component';
import { OptionComponent } from '../../shared/components/select/option/option.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { PrescribeMedicationComponent } from './components/prescribe-medication.component';

export const routes: Routes = [
  {
    path: '',
    component: PrescribeMedicationComponent,
    data: { breadcrumb: 'prescribe-medication' },
  },
];
@NgModule({
  declarations: [PrescribeMedicationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    AsyncPipe,
    AgePipe,
    MatAutocompleteModule,
    ChipComponent,
    AliSelectComponent,
    OptionComponent,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatIconModule,
    CustomTabComponent,
    MatTabsModule
  ],
  providers: [AsyncPipe, AgePipe],
})
export class PrescribeMedicationModule {}
