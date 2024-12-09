import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { SwiperData } from '../../models/swiper-slider';
import { CardInfo } from '../../models/card-info';

@Component({
  selector: 'app-swiper-slider-card',
  standalone: false,
  templateUrl: './swiper-slider-card.component.html',
  styleUrl: './swiper-slider-card.component.scss',
})
export class SwiperSliderCardComponent implements AfterViewInit {
  swiperData = input<CardInfo[]>([]);
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
        perView: 5,
        spacing: 5,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: {
            perView: 3,
            spacing: 5,
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1,
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

}
