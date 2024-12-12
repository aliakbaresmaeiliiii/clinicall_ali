import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggustions-service',
  templateUrl: './suggustions-service.component.html',
  // styleUrl: './suggustions-service.component.scss',
  styleUrls: [
    '../../../../node_modules/keen-slider/keen-slider.min.css',
    './suggustions-service.component.scss',
  ],
  standalone: false,
})
export class SuggustionsServiceComponent {
  router = inject(Router);
  swiperData = [
    {
      id: 1,
      name: 'Dentistry',
      description: 'Comprehensive dental care and treatments.',
      src: '../../../assets/images/ui/services/Dentistry.jpeg',
      count: 400,
    },
    {
      id: 2,
      name: 'Skin, Hair, and Beauty',
      description:
        'Advanced treatments for skin, hair, and beauty enhancement.',
      src: '../../../assets/images/ui/services/Skin, Hair, and Beauty.jpeg',
      count: 400,
    },
    {
      id: 3,
      name: 'Psychology',
      description: 'Mental health support and therapy services.',
      src: '../../../assets/images/ui/services/Psychology.jpeg',
      count: 500,
    },
    {
      id: 4,
      name: 'Gynecology & Obstetrics',
      description: "Specialized care for women's health and pregnancy.",
      src: '../../../assets/images/ui/services/Gynecology & Obstetrics.jpeg',
      count: 600,
    },
    {
      id: 5,
      name: 'Urology',
      description: 'Expertise in urinary tract and reproductive health.',
      src: '../../../assets/images/ui/services/Urology.jpeg',
      count: 700,
    },
    {
      id: 6,
      name: 'Ophthalmology',
      description: 'Eye care and vision correction services.',
      src: '../../../assets/images/ui/services/Ophthalmology.jpeg',
      count: 700,
    },
    {
      id: 7,
      name: 'Nose Surgery',
      description: 'Cosmetic and reconstructive nasal surgeries.',
      src: '../../../assets/images/ui/services/Nose Surgery.jpeg',
      count: 1200,
    },
  ];

  navigateURL(data: any) {
    const getData = data.name;

    switch (getData) {
      case 'Dentistry':
        this.router.navigate(['speciality']);
        break;

      default:
        break;
    }
  }
}
