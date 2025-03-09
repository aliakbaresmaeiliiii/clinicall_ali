import {
  Component,
  inject,
  makeStateKey,
  OnInit,
  signal,
  TemplateRef,
  TransferState,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxStarsComponent } from 'ngx-stars';
import { environment } from '../../environments/environment';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { CopyLinkDialogComponent } from '../../shared/components/copy-link-dialog/copy-link-dialog.component';
import { likeDTO } from '../shared-ui/models/like';
import { LikesService } from '../shared-ui/services/likes.service';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { OnlineConsultaionDialogComponent } from './online-consultaion-dialog/online-consultaion-dialog.component';
import { DialogService } from '../../shared/services/dialog.service';
import { PatientFavoritesService } from '../shared-ui/services/patient-favorites.service';

@Component({
  selector: 'app-filter-layout',
  standalone: false,
  templateUrl: './filter-layout.component.html',
  styleUrl: './filter-layout.component.scss',
})
export class FilterLayoutComponent implements OnInit {
  tabData = signal<DoctorsDTO[]>([]);
  mostPopular: DoctorsDTO[] = [];
  doctorService = inject(DoctorsService);
  toast = inject(ToastrService);
  dialogService = inject(DialogService);
  patientFavoriteService = inject(PatientFavoritesService);

  router = inject(Router);
  isLiked = false;
  userData: any;
  likeService = inject(LikesService);
  dialog = inject(MatDialog);
  @ViewChild(NgxStarsComponent)
  starsComponent!: NgxStarsComponent;
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('tabData');
  ratingDisplay: number = 0;
  favoriteStates: boolean[] = [];

  urlIcon = {
    empty: '../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../assets/images/ui/svg/star-half.svg',
    full: '../../../assets/images/ui/svg/star-full.svg',
  };

  templateOne = viewChild.required<TemplateRef<any>>('templateOne');
  templateTwo = viewChild.required<TemplateRef<any>>('templateTwo');
  templateThree = viewChild.required<TemplateRef<any>>('templateThree');
  templatefour = viewChild.required<TemplateRef<any>>('templatefour');

  bestSelling = [
    {
      id: 1,
      title: 'Mesotherapy',
      description: 'Deep cleansing and nourishing for healthy skin.',
      src: '../../../assets/images/ui/hair&skin/Mesotherapy.webp',
      count: 400,
      price: 120,
      discount: 10,
      doctorName: 'Dr. Sarah Johnson',
      doctorImage: '../../../assets/images/doctors/DrSarah.jpg',
      productImage: '../../../assets/images/ui/hair&skin/Mesotherapy.webp',
      star: 4.5,
      address: '123 SkinCare Ave, Beauty City',
      briefDescription:
        'Mesotherapy revitalizes your skin by delivering essential nutrients directly to the dermis.',
    },
  ];

  tabs: {
    id: number;
    title: string;
    template: TemplateRef<any>;
    context?: any;
  }[] = [];

  ngOnInit(): void {
    this.fetchDefaultData();
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.userData = JSON.parse(getUserData);
    }
  }

  setDataInTabs() {
    this.tabs = [
      {
        id: 0,
        title: 'Tab 1',
        template: this.templateOne(),
        context: { data: 'Data for Tab 1' },
      },
      {
        id: 1,
        title: 'Tab 2',
        template: this.templateTwo(),
        context: { data: 'Data for Tab 2' },
      },
      {
        id: 3,
        title: 'Tab 3',
        template: this.templateThree(),
        context: { data: 'Data for Tab 3' },
      },
      {
        id: 4,
        title: 'Tab 4',
        template: this.templatefour(),
        context: { data: 'Data for Tab 4' },
      },
    ];
  }

  handleTabChange(data: any) {
    this.fetchDefaultData();
    if (data === 'Default') {
      this.fetchDefaultData();
    }
    if (data.label === 'Default') {
      this.fetchDefaultData();
    } else if (data.label === 'Most Popular') {
    } else {
      this.tabData.set([]);
    }
  }

  handleChangeValueInput(data: any) {
    this.filterDoctor(data);
  }

  fetchDefaultData() {
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);
    if (!storedData) {
      this.doctorService.getDoctors().subscribe({
        next: (response: any) => {
          const newData = response.data.map((img: any) => {
            img.profile_img = img.profile_img
              ? `${environment.urlProfileImg}${img.profile_img}`
              : '../../../assets/images/bg-01.png';
            return img;
          });
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
    return;
  }

  handleTabChangeTitle(data: any) {
    const query = {
      isPopular: true,
    };
    switch (data.label) {
      case 'Defualt':
        this.filterDoctor();
        break;

      case 'Most Popular':
        this.filterDoctor(query);

        break;

      default:this.filterDoctor()
        break;
    }
  }

  filterDoctor(filter?: any) {
    this.doctorService.getDoctors(filter).subscribe((res: any) => {
      const newData = res.data.map((doctor: any) => {
        doctor.profile_img = doctor.profile_img
          ? `${environment.urlProfileImg}${doctor.profile_img}`
          : '../../../assets/images/bg-01.png';
        return doctor;
      });
      this.tabData.set(newData);
    });
  }

  filterServicesById(data: string) {
    this.doctorService.filterServicesById(data).subscribe((res: any) => {
      const newData = res.data.map((doctor: any) => {
        doctor.profile_img = doctor.profile_img
          ? `${environment.urlProfileImg}${doctor.profile_img}`
          : '../../../assets/images/bg-01.png';
        return doctor;
      });
      this.tabData.set(newData);
    });
  }

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

  countDoctorClick(id: number) {
    this.doctorService.countDoctorClick(id).subscribe(res => {});
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
    this.tabData()[id].is_liked = !this.tabData()[id].is_liked;

    const payload: likeDTO = {
      isLike: this.tabData()[id].is_liked,
      patient_id: user_id,
      doctor_id: data.id, // Ensure correct doctor ID
    };

    this.likeService.addLike(payload).subscribe({
      next: res => {},
      error: err => {},
    });
  }

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.first_name}/${docotoInfo.id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
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
        console.error('❌ Error:', err);
        // Revert UI change if API call fails
        this.favoriteStates[index] = !this.favoriteStates[index];
      },
    });
  }

  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }
}
