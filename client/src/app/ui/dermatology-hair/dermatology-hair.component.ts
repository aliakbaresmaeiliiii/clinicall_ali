import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-dermatology-hair',
  standalone: false,
  templateUrl: './dermatology-hair.component.html',
  styleUrl: './dermatology-hair.component.scss',
})
export class DermatologyHairComponent implements AfterViewInit {
  imagesDermatology = [
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',
      key: 1,
      specialty: 'Dentistry',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 2,
      specialty: 'Dermatologist and Aesthetic Specialist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 3,
      specialty: 'Psychologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 4,
      specialty: 'Neurologist',
      count: 5000,
    },

    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 5,
      specialty: 'Internist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 6,
      specialty: 'Ophthalmologist',
      count: 5000,
    },

    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 7,
      specialty: 'Nose Surgery',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 7,
      specialty: 'Nose Surgery',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 7,
      specialty: 'Nose Surgery',
      count: 5000,
    },
  ];

  ngAfterViewInit(): void {
    this.initializeDermatologySwiper();
  }

  initializeDermatologySwiper(): void {
    console.log('Initializing Dermatology Swiper...');
    new Swiper('.dermatologySwiper', {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        el: '.dermatology-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.dermatology-next',
        prevEl: '.dermatology-prev',
      },
    });
  }
}
