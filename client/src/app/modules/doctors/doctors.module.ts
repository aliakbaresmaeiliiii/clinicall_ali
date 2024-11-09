import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { FilterComponent } from '../users/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgUploaderComponent } from '../../shared/components/img-uploader/img-uploader.component';
import {
  MatDialogActions,
  MatDialogModule,
  MatDialogContent,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GoogleMapComponent } from '../../shared/components/google-map/google-map.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { AgeValidatorDirective } from '../../shared/directives/age-validator/age-validator.directive';
const routes: Routes = [
  {
    path: 'all-doctors',
    component: DoctorsComponent,
    data: { breadcrumb: 'all-doctors' },
  },
  {
    path: 'add-doctors',
    component: AddDoctorComponent,
    data: { breadcrumb: 'add-doctors' },
  },
  {
    path: 'doctor-detail/:id',
    component: DoctorDetailComponent,
    data: { breadcrumb: 'doctor-detail' },
  },
];

@NgModule({
  declarations: [
    DoctorsComponent,
    DoctorDetailComponent,
    DoctorListComponent,
    EditDoctorComponent,
    AddDoctorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FilterComponent,
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
    NgxMatIntlTelInputComponent,
    AsyncPipe,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    ImgUploaderComponent,
    AgePipe,
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
    MatProgressBarModule,
    MatMenuModule,
    MatTabsModule,
    AgeValidatorDirective,
    GoogleMapComponent,
  ],
  exports: [DoctorListComponent],
  providers: [AgePipe],
})
export class DoctorsModule {}
