import {
  AfterViewInit,
  Component,
  inject,
  makeStateKey,
  OnInit,
  TransferState,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DilogDotorAppointmentComponent } from './dilog-dotor-appointment/dilog-dotor-appointment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DoctorsService } from '../../modules/doctors/doctors.service';
import { environment } from '../../environments/environment';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { DialogLocationDrComponent } from './dialog-location-dr/dialog-location-dr.component';
import { ISpecialization } from './models/specializtion.model';
import { CopyLinkDialogComponent } from '../../shared/components/copy-link-dialog/copy-link-dialog.component';
import { LikesService } from '../shared-ui/services/likes.service';
import { likeDTO } from '../shared-ui/models/like';

@Component({
  selector: 'app-get-doctor-apointment',
  standalone: false,
  templateUrl: './get-doctor-apointment.component.html',
  styleUrl: './get-doctor-apointment.component.scss',
})
export class GetDoctorApointmentComponent implements OnInit, AfterViewInit {
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);
  likeService = inject(LikesService);
  doctorService = inject(DoctorsService);
  transferState = inject(TransferState);
  specialization: ISpecialization[] = [];
  DATA_KEY = makeStateKey<any>('doctorInfo');
  doctorInfo: DoctorsDTO[] = [];
  coordinates: { lat: number; lng: number }[] = [];
  doctorId!: number;
  private destroy$ = new Subject<void>();
  briefText: string =
    'Has a specialized board for diseases of infants and children, treatment of digestive and allergic disorders...';
  isExpanded: boolean = false;
  addressBreifly: string = '';
  isLiked = false;
  userData: any;
  ngAfterViewInit() {
    this.fetchData(this.doctorId);
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
        const getID = params.get('id');
        this.doctorId = getID;
      });

    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.userData = JSON.parse(getUserData).user_id;
    }

  }

  fetchData(doctorId: number) {
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);

    if (!storedData) {
      this.doctorService
        .getDoctorSpecialization(doctorId)
        .subscribe((special: any) => {
          console.log('special', special);
          this.specialization = special.data;
        });
      this.doctorService.doctorDetial(doctorId).subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            const newData = response.map((patient: any) => {
              patient.profileImage = patient.profileImage
                ? `${environment.urlProfileImg}${patient.profileImage}`
                : '../../../assets/images/bg-01.png';
              return patient;
            });
            this.doctorInfo = newData;
            const match = newData[0].address.match(/^Klinik Kesihatan\s*/);
            this.addressBreifly = match ? match[0] : '';

            this.transferState.set(this.DATA_KEY, this.doctorInfo);

            this.coordinates = this.doctorInfo
              .filter(item => item.location)
              .map((loc: any) => {
                return {
                  lng: loc.location.x,
                  lat: loc.location.y,
                };
              });
          }
        },

        error: e => console.error(e),
        complete: () => console.info('complete'),
      });
    } else {
      this.doctorInfo = storedData;
      this.coordinates = this.doctorInfo
        .filter(item => item.location)
        .map((loc: any) => {
          console.log('📌', loc.location);
          return {
            lng: loc.location.x,
            lat: loc.location.y,
          };
        });
      return;
    }
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }

  comment() {}

  getConsultation() {
    this.dialog.open(DilogDotorAppointmentComponent);
  }

  takeTurn() {}

  showMap(
    row: DoctorsDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DialogLocationDrComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getData();
    });
  }

  formatRating(rating: number | string): string {
    return parseFloat(rating.toString()).toFixed(1);
  }

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.name}/${docotoInfo.doctor_id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }

  toggleLike(info: DoctorsDTO,doctor_id:number) {
    const user_id = this.userData;
    const payload: likeDTO = {
      entity_id: info.doctor_id,
      entity_type: info.name,
      user_id: user_id,
    };
    this.isLiked = !this.isLiked;
    this.likeService.addLike(payload,doctor_id).subscribe((res)=>{

    });
  }
}
