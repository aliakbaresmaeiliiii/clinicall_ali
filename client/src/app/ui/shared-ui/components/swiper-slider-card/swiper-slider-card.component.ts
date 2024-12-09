import { AfterViewInit, Component, input } from '@angular/core';
import { CardInfo } from '../../models/card-info';
import Swiper from 'swiper';

@Component({
  selector: 'app-swiper-slider-card',
  standalone: false,
  templateUrl: './swiper-slider-card.component.html',
  styleUrl: './swiper-slider-card.component.scss',
})
export class SwiperSliderCardComponent implements AfterViewInit {
  swiperData = input<CardInfo[]>([]);
  title = input<string>('');

  ngAfterViewInit(): void {
    this.initializeServiceSwiper();
  }
  ngOnInit(): void {}

  initializeServiceSwiper(): void {
    new Swiper('.cardSwiper', {
      spaceBetween: 10,

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
          slidesPerView: 2,
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
