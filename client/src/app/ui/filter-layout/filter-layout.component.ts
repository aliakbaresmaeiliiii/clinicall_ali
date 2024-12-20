import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { DoctorsService } from '../../modules/doctors/doctors.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { likeDTO } from '../shared-ui/models/like';
import { LikesService } from '../shared-ui/services/likes.service';
import { MatDialog } from '@angular/material/dialog';
import { CopyLinkDialogComponent } from '../../shared/components/copy-link-dialog/copy-link-dialog.component';

@Component({
  selector: 'app-filter-layout',
  standalone: false,
  templateUrl: './filter-layout.component.html',
  styleUrl: './filter-layout.component.scss',
})
export class FilterLayoutComponent implements OnInit {
  tabData: DoctorsDTO[] = [];
  mostPopular: DoctorsDTO[] = [];
  doctorService = inject(DoctorsService);
  router = inject(Router);
  isLiked = false;
  userData: any;
  likeService = inject(LikesService);
  dialog = inject(MatDialog);

  get floor() {
    return Math.floor;
  }
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
      this.userData = JSON.parse(getUserData).user_id;
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
    this.tabData = [];
    if (data.label === 'Default') {
      this.fetchDefaultData();
    } else if (data.label === 'Most Popular') {
      this.fetchMostPopularData();
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
      this.tabData = newData;
      debugger;
    });
  }

  fetchMostPopularData() {
    this.doctorService.getMostPopularDoctor().subscribe((data: any) => {
      const newData = data.data.map((doctor: any) => {
        doctor.profileImage = doctor.profileImage
          ? `${environment.urlProfileImg}${doctor.profileImage}`
          : '../../../assets/images/bg-01.png';
        return doctor;
      });
      this.tabData = newData;
    });
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

  toggleLike(data: DoctorsDTO, doctor_id: any) {
    this.tabData[doctor_id].is_liked = !this.tabData[doctor_id].is_liked;
    const user_id = this.userData;
    
    const payload: likeDTO = {
      doctor_id: data.doctor_id,
      entity_type: data.name,
      user_id: user_id,

    };
    this.likeService.addLike(payload).subscribe(res => {});
  }

  shareInfo(docotoInfo: DoctorsDTO) {
    const doctorLink = `localhost:4200/doctor/${docotoInfo.name}/${docotoInfo.doctor_id}`; // Generate the doctor's link
    this.dialog.open(CopyLinkDialogComponent, {
      data: { link: doctorLink },
    });
  }
}
