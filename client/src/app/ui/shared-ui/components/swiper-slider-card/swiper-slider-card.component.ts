import { AfterViewInit, Component, ElementRef, input, ViewChild, OnDestroy, HostListener } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { CardInfo } from '../../models/card-info';

@Component({
  selector: 'app-swiper-slider-card',
  standalone: false,
  templateUrl: './swiper-slider-card.component.html',
  styleUrl: './swiper-slider-card.component.scss',
})
export class SwiperSliderCardComponent implements AfterViewInit, OnDestroy {
  swiperData = input<CardInfo[]>([]);
  isShowBtn = input<boolean>(false);
  title = input<string>('');
  autoPlay = input<boolean>(true);
  autoPlayInterval = input<number>(4000);
  showProgress = input<boolean>(true);
  
  currentSlide: number = 0;
  dotHelper: Array<number> = [];
  progressWidth: string = '0%';
  private autoPlayTimer: any = null;
  private isDragging: boolean = false;
  
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
    // Use setTimeout to ensure the DOM is fully rendered
    setTimeout(() => {
      this.initializeSlider();
    }, 100);
  }

  private initializeSlider(): void {
    if (!this.sliderRef?.nativeElement) {
      console.warn('Slider reference not found');
      return;
    }

    try {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel;
          this.updateProgress();
        },
        dragStarted: () => {
          this.isDragging = true;
          this.stopAutoPlay();
        },
        dragEnded: () => {
          this.isDragging = false;
          if (this.autoPlay()) {
            this.startAutoPlay();
          }
        },
        slides: {
          perView: 4,
          spacing: 20,
        },
        breakpoints: {
          "(max-width: 1400px)": {
            slides: {
              perView: 3,
              spacing: 15,
            },
          },
          "(max-width: 1024px)": {
            slides: {
              perView: 2,
              spacing: 15,
            },
          },
          "(max-width: 768px)": {
            slides: {
              perView: 1,
              spacing: 10,
            },
          },
          "(max-width: 480px)": {
            slides: {
              perView: 1,
              spacing: 8,
            },
          },
        },
      });

      if (this.slider?.track?.details?.slides) {
        this.dotHelper = Array.from({ length: this.slider.track.details.slides.length }, (_, i) => i);
        this.updateProgress();
      } else {
        this.dotHelper = [];
      }

      if (this.autoPlay()) {
        this.startAutoPlay();
      }
    } catch (error) {
      console.error('Error initializing slider:', error);
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (this.slider && !this.isDragging) {
        const totalSlides = this.slider.track?.details?.slides?.length || 0;
        if (this.currentSlide < totalSlides - 1) {
          this.slider.next();
        } else {
          this.slider.moveToIdx(0);
        }
      }
    }, this.autoPlayInterval());
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private updateProgress(): void {
    if (this.slider?.track?.details?.slides) {
      const totalSlides = this.slider.track.details.slides.length;
      const progress = ((this.currentSlide + 1) / totalSlides) * 100;
      this.progressWidth = `${progress}%`;
    }
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
    this.stopAutoPlay();
    if (this.slider) {
      this.slider.destroy();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.autoPlay()) {
      this.stopAutoPlay();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.autoPlay() && !this.isDragging) {
      this.startAutoPlay();
    }
  }
}
