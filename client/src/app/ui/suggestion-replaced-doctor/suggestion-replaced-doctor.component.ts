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
import { likeDTO } from '../shared-ui/models/like';
import { catchError, throwError } from 'rxjs';

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
        doctor.profile_img = doctor.profile_img
          ? `${environment.urlProfileImg}${doctor.profile_img}`
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
      let doctorName = data.first_name;
      this.countDoctorClick(data.id);
      this.router.navigate([`/doctor/${doctorName}/${data.id}`]);
    }
  }

  takeTurn() {}

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.first_name}${docotoInfo.last_name}/${docotoInfo.id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }



  toggleLike(data: DoctorsDTO, id: number) {
    if (!this.userData) {
      this.toast.info('Please login first!');
      this.router.navigate(['auth/login']);
      return;
    }
    const user_id = this.userData.id;
    // Ensure tabData exists before modifying
    if (!this.doctors || !this.doctors[id]) {
      console.error('Invalid tabData reference');
      return;
    }
    // Toggle is_liked status
    this.doctors[id].isLiked = !this.doctors[id].isLiked;

    const payload: likeDTO = {
      isLike: this.doctors[id].isLiked,
      patient_id: user_id,
      doctor_id: data.id, // Ensure correct doctor ID
    };

    this.likeService.addLike(payload).subscribe({
      next: res => {},
      error: err => {},
    });
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
      },
      error: (err) => {
        // Revert UI change if API call fails
        this.favoriteStates[index] = !this.favoriteStates[index];
      },
    });
  }

  // getAppointment(data: any) {
  //   let doctorName = data.name.replace(/\s+/g, '-');
  //   const doctorId = data.id;
  //   this.countDoctorClick(doctorId);
  //   this.router.navigate([`/doctor/${doctorName}/${doctorId}`]);
  // }
  getAppointment(data: DoctorsDTO) {
    const doctorName = `${data.first_name}${data.last_name}` ;
    const doctorId = data.id;
    this.countDoctorClick(doctorId).subscribe({
        next: () => {
            this.router.navigate([`/doctor/${doctorName}/${doctorId}`]);
        },
        error: (err) => {
            console.error('Error counting doctor click:', err);
            this.toast.error('An error occurred while processing your request.');
        }
    });
}

  // countDoctorClick(id: number) {
  //   this.doctorService.countDoctorClick(id).subscribe(res => {});
  // }
  countDoctorClick(id: number) {
    return this.doctorService.countDoctorClick(id).pipe(
        catchError((err) => {
            console.error('Error counting doctor click:', err);
            this.toast.error('An error occurred while processing your request.');
            return throwError(() => err);;
        })
    );
}
}
