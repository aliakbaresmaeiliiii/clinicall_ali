import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-suggestions-skin-hair',
  standalone: false,
  templateUrl: './suggestions-skin-hair.component.html',
  styleUrl: './suggestions-skin-hair.component.scss',
})
export class SuggestionsSkinHairComponent implements AfterViewInit {
  beauty = [
    {
      key: 1,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',

      price: 3000,
      off: '20%',
    },
    {
      key: 2,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',

      price: 3000,
      off: '20%',
    },
    {
      key: 3,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',

      price: 3000,
      off: '20%',
    },
    {
      key: 4,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },
    {
      key: 5,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },

    {
      key: 6,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },
    {
      key: 6,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },
    {
      key: 6,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },
    {
      key: 6,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },
  ];

  ngAfterViewInit(): void {
    this.initializeSkinSwiper();
  }

  initializeSkinSwiper(): void {
    new Swiper('.skinSwiper', {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
