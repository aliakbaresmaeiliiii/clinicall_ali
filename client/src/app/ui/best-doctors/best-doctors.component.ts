import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-best-doctors',

  templateUrl: './best-doctors.component.html',
  styleUrl: './best-doctors.component.scss',
})
export class BestDoctorsComponent implements OnInit {
  ngOnInit(): void {
    var swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}
