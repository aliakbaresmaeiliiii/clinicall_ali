import {
  Component,
  inject,
  makeStateKey,
  signal,
  TransferState,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  BookingStatus,
  DoctorsDTO,
} from '../../../../modules/doctors/models/doctors';
import { DoctorsService } from '../../../../modules/doctors/services/doctors.service';
import { CopyLinkDialogComponent } from '../../../../shared/components/copy-link-dialog/copy-link-dialog.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { OnlineConsultaionDialogComponent } from '../../../filter-layout/online-consultaion-dialog/online-consultaion-dialog.component';
import { likeDTO } from '../../../shared-ui/models/like';
import { LikesService } from '../../../shared-ui/services/likes.service';
import { PatientFavoritesService } from '../../../shared-ui/services/patient-favorites.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-favorites',
  standalone: false,
  templateUrl: './user-favorites.component.html',
  styleUrl: './user-favorites.component.scss',
})
export class UserFavoritesComponent {
  tabData = signal<DoctorsDTO[]>([]);
  userData: any;
  toast = inject(ToastrService);
  router = inject(Router);
  doctorService = inject(DoctorsService);
  dialogService = inject(DialogService);
  likeService = inject(LikesService);
  favoriteStates: boolean[] = [];
  patientFavoriteService = inject(PatientFavoritesService);
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('tabData');
  patient_id!: string;

  urlIcon = {
    empty: '../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../assets/images/ui/svg/star-half.svg',
    full: '../../../assets/images/ui/svg/star-full.svg',
  };

  ngOnInit(): void {
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.userData = JSON.parse(getUserData);
      this.patient_id = this.userData.id;
    }
    this.fetchDefaultData();
  }

  fetchDefaultData() {
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);
    const payload = {
      patient_id: this.patient_id,
    };
  
    if (!storedData) {
      this.doctorService.getDoctors(payload).subscribe({
        next: (response: any) => {
          const newData = response.data.map((item: any) => ({
            ...item,
            is_booked: item.is_booked === 1 ? BookingStatus.is_booked : BookingStatus.is_available,
            profile_img: item.profile_img
              ? `${environment.urlProfileImg}${item.profile_img}`
              : '../../../assets/images/bg-01.png',
          }));
  
          this.tabData.set(newData);
          
          this.transferState.set(this.DATA_KEY, newData);
        },
        error: e => {
          this.toast.error(e);
          return of([]);
        },
        complete: () => {},
      });
    } else {
      this.tabData.set(storedData);
    }
  }
  
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

  countDoctorClick(id: number) {
    this.doctorService.countDoctorClick(id).subscribe(res => {});
  }

  onlineConsultationDialog(
    data: DoctorsDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    if (!this.userData) {
      this.toast.error('Please login before make appointment...');
      this.router.navigate(['auth/login']);
    } else {
      this.dialogService.openDialog(OnlineConsultaionDialogComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        doctor_id: data.id,
      });
    }
  }

  toggleLike(data: DoctorsDTO, id: number) {
    if (!this.userData) {
      this.toast.info('Please login first!');
      this.router.navigate(['auth/login']);
      return;
    }
    const user_id = this.userData.id;
    // Ensure tabData exists before modifying
    if (!this.tabData() || !this.tabData()[id]) {
      console.error('Invalid tabData reference');
      return;
    }
    // Toggle is_liked status
    this.tabData()[id].isLiked = !this.tabData()[id].isLiked;

    const payload: likeDTO = {
      isLike: this.tabData()[id].isLiked,
      patient_id: user_id,
      doctor_id: data.id, // Ensure correct doctor ID
    };

    this.likeService.addLike(payload).subscribe({
      next: res => {},
      error: err => {},
    });
  }

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.name}/${docotoInfo.id}`; // Generate the doctor's link
    this.dialogService.openDialog(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }

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
      next: res => {},
      error: err => {
        this.favoriteStates[index] = !this.favoriteStates[index];
      },
    });
  }
}
