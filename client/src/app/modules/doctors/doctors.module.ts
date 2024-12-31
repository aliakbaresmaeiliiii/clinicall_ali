import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from '../../shared/components/google-map/google-map.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { SharedModule } from '../../shared/shared.module';
import { PatientsModule } from '../patients/patients.module';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { DoctorsComponent } from './components/doctors.component';

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
    FormsModule,
    PatientsModule,
    GoogleMapComponent,
    SharedModule

  ],
  exports: [DoctorListComponent],
  providers: [AgePipe],
})
export class DoctorsModule {}
