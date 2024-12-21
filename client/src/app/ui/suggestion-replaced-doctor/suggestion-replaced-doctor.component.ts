import {
  AfterViewInit,
  Component,
  inject,
  makeStateKey,
  OnInit,
  TransferState,
} from '@angular/core';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { DoctorsService } from '../../modules/doctors/doctors.service';
import { ISpecialization } from '../get-doctor-apointment/models/specializtion.model';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CopyLinkDialogComponent } from '../../shared/components/copy-link-dialog/copy-link-dialog.component';
import { likeDTO } from '../shared-ui/models/like';
import { LikesService } from '../shared-ui/services/likes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-replaced-doctor',
  standalone: false,
  templateUrl: './suggestion-replaced-doctor.component.html',
  styleUrl: './suggestion-replaced-doctor.component.scss',
})
export class SuggestionReplacedDoctorComponent
  implements OnInit, AfterViewInit
{
  transferState = inject(TransferState);
  doctorService = inject(DoctorsService);
  likeService = inject(LikesService);
  dialog = inject(MatDialog);
  router = inject(Router);

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
      this.userData = JSON.parse(getUserData).user_id;
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

  //  this.doctorService.getDoctors().subscribe((response: any) => {
  //       const newData = response.data.map((doctor: any) => {
  //         doctor.profileImage = doctor.profileImage
  //           ? `${environment.urlProfileImg}${doctor.profileImage}`
  //           : '../../../assets/images/bg-01.png';
  //         return doctor;
  //       });
  //       this.tabData = newData;
  //     });

  // fetchData(doctorId: number) {
  //   this.transferState.remove(this.DATA_KEY);
  //   const storedData = this.transferState.get(this.DATA_KEY, null);

  //   if (!storedData) {
  //     this.doctorService
  //       .getDoctors()
  //       .subscribe((data: any) => {
  //         this.specialization = data.data;
  //       });
  //     this.doctorService.doctorDetial(doctorId).subscribe({
  //       next: (response: any) => {
  //         if (response && response.length > 0) {
  //           const newData = response.map((patient: any) => {
  //             patient.profileImage = patient.profileImage
  //               ? `${environment.urlProfileImg}${patient.profileImage}`
  //               : '../../../assets/images/bg-01.png';
  //             return patient;
  //           });
  //           this.data = newData;
  //           const match = newData[0].address.match(/^Klinik Kesihatan\s*/);
  //           this.addressBreifly = match ? match[0] : '';

  //           this.transferState.set(this.DATA_KEY, this.data);

  //           this.coordinates = this.data
  //             .filter(item => item.location)
  //             .map((loc: any) => {
  //               return {
  //                 lng: loc.location.x,
  //                 lat: loc.location.y,
  //               };
  //             });
  //         }
  //       },

  //       error: e => console.error(e),
  //       complete: () => console.info('complete'),
  //     });
  //   } else {
  //     this.data = storedData;
  //     this.coordinates = this.data
  //       .filter(item => item.location)
  //       .map((loc: any) => {
  //         console.log('📌', loc.location);
  //         return {
  //           lng: loc.location.x,
  //           lat: loc.location.y,
  //         };
  //       });
  //     return;
  //   }
  // }

  takeTurn() {}

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.name}/${docotoInfo.doctor_id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }

  toggleLike(info: DoctorsDTO, doctor_id: number) {
    this.doctors[doctor_id].is_liked = !this.doctors[doctor_id].is_liked;
    const user_id = this.userData;
    const payload: likeDTO = {
      doctor_id: info.doctor_id,
      entity_type: info.name,
      user_id: user_id,
    };
    this.likeService.addLike(payload).subscribe(res => {});
  }

  getAppointment(data: any) {
    let doctorName = data.name.replace(/\s+/g, '-');
    const doctorId = data.doctor_id;
    this.countDoctorClick(doctorId);
    this.router.navigate([`/doctor/${doctorName}/${doctorId}`]);
  }

  countDoctorClick(doctor_id: number) {
    this.doctorService.countDoctorClick(doctor_id).subscribe(res => {});
  }
}
