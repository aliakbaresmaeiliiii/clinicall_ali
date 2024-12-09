import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { SwiperData } from '../../models/swiper-slider';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: [
    "../../../../../../node_modules/keen-slider/keen-slider.min.css",
    './swiper-slider.component.scss',
  ],
  standalone: false,
})
export class SwiperSliderComponent {
  swiperData = input<SwiperData[]>([]);
  isShowBtn = input<boolean>(false);
  title = input<string>('');
  currentSlide: number = 1
  dotHelper: Array<Number> = []
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance 

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      initial: this.currentSlide,
      slideChanged: (s) => {
        this.currentSlide = s.track.details.rel;
      },
      slides: {
        perView: 4,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: {
            perView: 3,
            spacing: 10,
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 2,
            spacing: 8,
          },
        },
        "(max-width: 480px)": {
          slides: {
            perView: 1,
            spacing: 5,
          },
        },
      },
    });
  
    this.dotHelper = [
      ...Array(this.slider.track.details.slides.length).keys(),
    ];
  }
  

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  // ngAfterViewInit(): void {
  //   this.initializeServiceSwiper();
  // }

  // initializeServiceSwiper(): void {
  //   new Swiper('.serviceSwiper', {
  //     spaceBetween: 20,

  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //       renderBullet: function (index, className) {
  //         return '<span class="' + className + '">' + (index + 1) + '</span>';
  //       },
  //     },
  //     breakpoints: {
  //       640: {
  //         slidesPerView: 1,
  //       },
  //       768: {
  //         slidesPerView: 4,
  //       },
  //       1024: {
  //         slidesPerView: 4,
  //       },
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //   });
  // }
}
