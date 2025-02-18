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

  visitProfile(data: any) {
    if (!this.userData) {
      this.toast.error('Please login before make appointment...');
      this.router.navigate(['/login']);
    } else {
      let doctorName = data.first_name.replace(/\s+/g, '-');
      const doctor_id = data.id;
      this.countDoctorClick(doctor_id);
      this.router.navigate([`/doctor/${doctorName}/${doctor_id}`]);
      this.cdr.markForCheck();
    }
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
