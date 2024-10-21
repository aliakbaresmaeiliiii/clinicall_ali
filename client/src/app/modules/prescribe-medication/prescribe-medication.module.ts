import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrescribeMedicationComponent } from './prescribe-medication.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AgePipe } from '../../shared/pipes/age.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { AliSelectComponent } from '../../shared/components/select/ali-select/ali-select.component';
import { OptionComponent } from '../../shared/components/select/option/option.component';

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
    
  ],
  providers: [AsyncPipe,AgePipe],
})
export class PrescribeMedicationModule {}
