import {
  AfterViewInit,
  Component,
  inject,
  makeStateKey,
  OnInit,
  signal,
  TransferState,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { environment } from '../../environments/environment';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { CopyLinkDialogComponent } from '../../shared/components/copy-link-dialog/copy-link-dialog.component';
import { UserInfo } from '../../shared/models/userInfo';
import { likeDTO } from '../shared-ui/models/like';
import { LikesService } from '../shared-ui/services/likes.service';
import { DialogLocationDrComponent } from './dialog-location-dr/dialog-location-dr.component';
import { DilogDotorAppointmentComponent } from './dilog-dotor-appointment/dilog-dotor-appointment.component';
import { ISpecialization } from './models/specializtion.model';
import { FeedbackComponent } from '../shared-ui/components/feedback/feedback.component';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';

@Component({
  selector: 'app-get-doctor-apointment',
  standalone: false,
  templateUrl: './get-doctor-apointment.component.html',
  styleUrl: './get-doctor-apointment.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GetDoctorApointmentComponent implements OnInit, AfterViewInit {
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);
  router = inject(Router);
  likeService = inject(LikesService);
  doctorService = inject(DoctorsService);
  userService = inject(UserService);
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('doctorInfo');
  userInfo: UserInfo[] = [];
  toast = inject(ToastrService);
  urlIcon = {
    empty: '../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../assets/images/ui/svg/star-half.svg',
    full: '../../../assets/images/ui/svg/star-full.svg',
  };
  specialization: ISpecialization[] = [];
  doctorInfo = signal<DoctorsDTO[]>([]);
  coordinates: { lat: number; lng: number }[] = [];
  doctorId!: any;
  doctorName!: any;
  private destroy$ = new Subject<void>();
  briefText: string =
    'Has a specialized board for diseases of infants and children, treatment of digestive and allergic disorders...';
  isExpanded: boolean = false;
  addressBreifly: string = '';
  isLiked = false;
  userData: any;
  isShowComment = false;
  commentForm!: FormGroup;

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id');
      this.doctorName = params.get('name');
      this.fetchData({ doctor_id: this.doctorId });
      window.scroll({ top: 0, behavior: 'smooth' });
    });
  }

  createForm() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
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
      this.userData = JSON.parse(getUserData);
    }

    this.createForm();
    // this.getComment();
  }

  fetchData(filter: { doctor_id: string }) {
    debugger;
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);
    if (!storedData) {
      this.doctorService.getDoctors(filter).subscribe({
        next: (response: any) => {
          if (response.data) {
            const newData = response.data.map((img: any) => {
              img.profile_img = img.profile_img
                ? `${environment.urlProfileImg}${img.profile_img}`
                : '../../../assets/images/bg-01.png';
              return img;
            });
            this.doctorInfo.set(newData);
            console.log('🤲🤲🤲🤲',newData);
            

            // const match = newData[0].address.match(/^Subang Jaya\s*/);
            // this.addressBreifly = match ? match[0] : '';
            this.doctorService.storeDoctorInfo.set(newData);

            this.transferState.set(this.DATA_KEY, this.doctorInfo());
            this.coordinates = this.doctorInfo().map((loc: any) => {
              return {
                lng: loc.longitude,
                lat: loc.latitude,
              };
            });
          }
        },

        error: e => console.error(e),
        complete: () => console.info('complete'),
      });
    } else {
      this.doctorInfo = storedData;
      this.coordinates = this.doctorInfo()
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

  feedback(id: number): void {
    if (this.userData !== undefined) {
      this.dialog.open(FeedbackComponent, {
        width: '50rem',
        data: id,
      });
    } else {
      this.router.navigate(['login']);
    }
    // if (this.commentForm.invalid) {
    //   this.toast.error('Please enter a valid comment.');
    //   return;
    // }
    // this.isShowComment = !this.isShowComment;
    // const comment = this.commentForm.value.comment;
    // const payload: any = {
    //   id: this.userData.id,
    //   id: id,
    //   comment_text: comment,
    //   rating: 5,
    // };

    // this.doctorService.addComment(payload).subscribe({
    //   next: (res: { code: number; message: string } | any) => {
    //     if (res.code === 200) {
    //       this.getComment();
    //       this.toast.success('Message is successfully sent.');
    //       this.commentForm.reset();
    //     } else {
    //       this.toast.error(res.message || 'Failed to send the comment.');
    //     }
    //   },
    //   error: err => {
    //     this.toast.error('An error occurred while sending the comment.');
    //     console.error('Error:', err);
    //   },
    // });
  }

  getComment() {
    // this.userService.getUserInfo(this.userData.email).subscribe((res: any) => {
    //   this.userInfo = res.data;
    // });
  }

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
    return parseFloat(rating.toString())?.toFixed(1);
  }

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.first_name}/${docotoInfo.id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }

  toggleLike(info: DoctorsDTO, id: number) {
    this.doctorInfo()[id].is_liked = !this.doctorInfo()[id].is_liked;
    const getId = this.userData.id;
    // const payload: likeDTO = {
    //   id: info.id,
    //   entity_type: info.name,
    //   id: getId,
    // };
    // this.likeService.addLike(payload).subscribe(res => {});
  }
}
