import { AfterViewInit, Component, ElementRef, input, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
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
  currentSlide: number = 1;
  dotHelper: Array<number> = [];
  
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  slider: KeenSliderInstance | null = null;

  get slides(): CardInfo[] {
    return this.swiperData() || [];
  }

  get showLeftArrow(): boolean {
    return this.slider !== null && this.currentSlide > 0;
  }

  get showRightArrow(): boolean {
    return this.slider !== null && 
           !!this.slider.track?.details?.slides?.length && 
           this.currentSlide < this.slider.track.details.slides.length - 1;
  }

  get leftArrowClass(): string {
    return `arrow arrow--left ${this.currentSlide === 0 ? 'arrow--disabled' : ''}`;
  }

  get rightArrowClass(): string {
    const isLastSlide = this.slider?.track?.details?.slides?.length 
      ? this.currentSlide === this.slider.track.details.slides.length - 1
      : false;
    return `arrow arrow--right ${isLastSlide ? 'arrow--disabled' : ''}`;
  }

  ngAfterViewInit() {
    setTimeout(() => {
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
    
      if (this.slider?.track?.details?.slides) {
        this.dotHelper = Array.from({ length: this.slider.track.details.slides.length }, (_, i) => i);
      } else {
        this.dotHelper = [];
      }
    });
  }

  onPrevClick(): void {
    if (this.slider) {
      this.slider.prev();
    }
  }

  onNextClick(): void {
    if (this.slider) {
      this.slider.next();
    }
  }

  onDotClick(index: number): void {
    if (this.slider) {
      this.slider.moveToIdx(index);
    }
  }

  getDotClass(index: number): string {
    return `dot ${index === this.currentSlide ? 'active' : ''}`;
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }
}
