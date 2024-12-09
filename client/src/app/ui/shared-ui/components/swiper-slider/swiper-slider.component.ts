import { Component, input } from '@angular/core';
import Swiper from 'swiper';
import { SwiperData } from '../../models/swiper-slider';

@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrl: './swiper-slider.component.scss',
  standalone: false,
})
export class SwiperSliderComponent {
  swiperData = input<SwiperData[]>([]);

  ngAfterViewInit(): void {
    this.initializeServiceSwiper();
  }

  initializeServiceSwiper(): void {
    new Swiper('.serviceSwiper', {
      spaceBetween: 20,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
