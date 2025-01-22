import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { SwiperData } from '../../models/swiper-slider';

@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: [
    '../../../../../../node_modules/keen-slider/keen-slider.min.css',
    './swiper-slider.component.scss',
  ],
  standalone: false,
})
export class SwiperSliderComponent {
  swiperData = input<any[]>([]);
  isShowBtn = input<boolean>(false);
  title = input<string>('');
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  onClick = output();

  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: s => {
          this.currentSlide = s.track.details.rel;
        },
        slides: {
          perView: 4,
          spacing: 5,
        },
        breakpoints: {
          '(max-width: 1024px)': {
            slides: {
              perView: 3,
            },
          },
          '(max-width: 768px)': {
            slides: {
              perView: 2,
              spacing: 8,
            },
          },
          '(max-width: 480px)': {
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
    }, 100);
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  navigateToURl(data: any) {
    this.onClick.emit(data);
  }
}
