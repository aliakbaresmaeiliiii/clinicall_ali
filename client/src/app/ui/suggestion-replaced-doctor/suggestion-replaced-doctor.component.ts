import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  makeStateKey,
  OnInit,
  TransferState,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { CopyLinkDialogComponent } from '../../shared/components/copy-link-dialog/copy-link-dialog.component';
import { ISpecialization } from '../get-doctor-apointment/models/specializtion.model';
import { LikesService } from '../shared-ui/services/likes.service';
import { ToastrService } from 'ngx-toastr';
import { PatientFavoritesService } from '../shared-ui/services/patient-favorites.service';

@Component({
  selector: 'app-suggestion-replaced-doctor',
  standalone: false,
  templateUrl: './suggestion-replaced-doctor.component.html',
  styleUrl: './suggestion-replaced-doctor.component.scss',
})
export class SuggestionReplacedDoctorComponent
  implements OnInit, AfterViewInit
{
  toast = inject(ToastrService);
  transferState = inject(TransferState);
  doctorService = inject(DoctorsService);
  cdr = inject(ChangeDetectorRef);
  likeService = inject(LikesService);
  dialog = inject(MatDialog);
  router = inject(Router);
  patientFavoriteService = inject(PatientFavoritesService);

  DATA_KEY = makeStateKey<any>('doctorInfo');
  specialization: ISpecialization[] = [];
  doctors: DoctorsDTO[] = [];

  addressBreifly: string = '';
  coordinates: { lat: number; lng: number }[] = [];
  userData: any;
  isLiked = false;
  doctorId!: number;

  ngAfterViewInit(): void {
    this.fetchDefaultData();
  }

  ngOnInit(): void {
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.userData = JSON.parse(getUserData);
    }
  }

  fetchDefaultData() {
    this.doctorService.getDoctors().subscribe((response: any) => {
      const newData = response.data.map((doctor: any) => {
        doctor.profileImage = doctor.profileImage
          ? `${environment.urlProfileImg}${doctor.profileImage}`
          : '../../../assets/images/bg-01.png';
        return doctor;
      });
      this.doctors = newData;
    });
  }

  // visitProfile(data: any) {
  //   if (!this.userData) {
  //     this.toast.error('Please login before make appointment...');
  //     this.router.navigate(['auth/login']);
  //   } else {
  //     let doctorName = data.first_name.replace(/\s+/g, '-');
  //     const doctor_id = data.id;
  //     this.countDoctorClick(doctor_id);
  //     this.router.navigate([`/doctor/${doctorName}/${doctor_id}`]);
  //     this.cdr.markForCheck();
  //   }
  // }

  visitProfile(data: any) {
    if (!this.userData) {
      this.toast.error('Please login before make appointment...');
      this.router.navigate(['/login']);
    } else {
      let doctorName = data.first_name.replace(/\s+/g, '-');
      this.countDoctorClick(data.id);
      this.router.navigate([`/doctor/${doctorName}/${data.id}`]);
    }
  }

  takeTurn() {}

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.first_name}/${docotoInfo.id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }



  toggleLike(info: DoctorsDTO, id: number) {
    this.doctors[id].is_liked = !this.doctors[id].is_liked;
    const user_id = this.userData;

    // const payload: likeDTO = {
    //   user_id: info.id,
    //   doctor_id: info.id,
    // };
    // this.likeService.addLike(payload).subscribe(res => {});
  }

  favoriteStates: boolean[] = [];
  toggleFavorite(doctor_id: number, index: number) {
    if (!this.userData) {
      this.toast.info('Please login first!');
      this.router.navigate(['auth/login']);
      return;
    }
    const patient_id = this.userData.id;
    const payload = { doctor_id, patient_id };
    this.favoriteStates[index] = !this.favoriteStates[index];
    this.patientFavoriteService.addFavoritePatient(payload).subscribe({
      next: (res) => {
        console.log('✅ Favorite toggled:', res);
      },
      error: (err) => {
        console.error('❌ Error:', err);
        // Revert UI change if API call fails
        this.favoriteStates[index] = !this.favoriteStates[index];
      },
    });
  }

  getAppointment(data: any) {
    let doctorName = data.name.replace(/\s+/g, '-');
    const doctorId = data.id;
    this.countDoctorClick(doctorId);
    this.router.navigate([`/doctor/${doctorName}/${doctorId}`]);
  }

  countDoctorClick(id: number) {
    this.doctorService.countDoctorClick(id).subscribe(res => {});
  }
}
