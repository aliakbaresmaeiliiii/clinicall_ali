import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { DoctorsService } from '../../modules/doctors/doctors.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-filter-layout',
  standalone: false,
  templateUrl: './filter-layout.component.html',
  styleUrl: './filter-layout.component.scss',
})
export class FilterLayoutComponent implements OnInit {
  defualtData: DoctorsDTO[] = [];
  doctorService = inject(DoctorsService);

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
    this.fetchData();
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
  handleTabChange(index: number) {}

  fetchData() {
    this.doctorService.doctorDetial(1).subscribe((response: any) => {
      debugger;
      const newData = response.map((doctor: any) => {
        doctor.profileImage = doctor.profileImage
          ? `${environment.urlProfileImg}${doctor.profileImage}`
          : '../../../assets/images/bg-01.png';
        return doctor;
      });
      this.defualtData = newData;
      console.log(this.defualtData);
    });
  }
}
