import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { SharedModule } from '../../shared/shared.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DeletePatientDialogComponent } from './delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientsComponent } from './patients.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

export const routes: Routes = [
  {
    path: 'all-patients',
    component: PatientsComponent,
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
    data: { breadcrumb: 'add-patients' },
  },
  {
    path: 'patient-profile',
    component: PatientProfileComponent,
    data: { breadcrumb: 'patient-profile' },
  },
  {
    path: 'patient-detail/:id',
    component: PatientDetailComponent,
    data: { breadcrumb: 'patient-detail' },
  },
];

@NgModule({
  declarations: [
    PatientsComponent,
    AddPatientComponent,
    EditPatientDialogComponent,
    DeletePatientDialogComponent,
    PatientDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    LoaderComponent,
    NgxIntlTelInputModule,
    SharedModule,
  ],
  exports: [PatientsComponent,
    NgxIntlTelInputModule

  ],
  providers: [AgePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientsModule {}
