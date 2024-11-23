import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { ImgUploaderComponent } from '../../shared/components/img-uploader/img-uploader.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { FilterComponent } from '../users/filter/filter.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DeletePatientDialogComponent } from './delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientsComponent } from './patients.component';
import { SharedModule } from '../../shared/shared.module';

export const routes: Routes = [
  {
    path: 'all-patients',
    component: PatientsComponent,
    data: { breadcrumb: 'all-patients' },
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    LoaderComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogActions,
    MatDialogModule,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
    MatTooltipModule,
    NgOptimizedImage,
    AsyncPipe,
    MatProgressBarModule,
    MatMenuModule,
    SharedModule
  ],
  exports: [PatientsComponent],
  providers: [AgePipe],

})
export class PatientsModule {}
