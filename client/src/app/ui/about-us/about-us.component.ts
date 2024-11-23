import {
  Component
} from '@angular/core';
import Swiper from 'swiper';

@Component({
    selector: 'app-about-us',
    imports: [],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    styles: [
        `
      .item {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.5s, transform 0.5s;
      }
      .item.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `,
    ]
})
export class AboutUsComponent {

  ngOnInit(): void {
    var swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
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
      on: {
        slideChange: () => {
          // Add any custom logic here if needed
        },
      },
    });
  }

}
