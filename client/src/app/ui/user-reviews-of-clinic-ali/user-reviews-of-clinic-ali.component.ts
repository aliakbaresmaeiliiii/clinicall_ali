import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { ReviewsDTO } from '../../modules/doctors/models/doctors';

@Component({
  selector: 'app-user-reviews-of-clinic-ali',
  templateUrl: './user-reviews-of-clinic-ali.component.html',
  styleUrl: './user-reviews-of-clinic-ali.component.scss',
  standalone: false,
})
export class UserReviewsOfClinicAliComponent implements OnInit, AfterViewInit {
  name = input<string>();
  star = input<number>();
  description = input<string>();
  date = input<string>();
  service = inject(DoctorsService);
  userReview = signal<ReviewsDTO[]>([]);

  

  urlIcon = {
    empty: '../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../assets/images/ui/svg/star-half.svg',
    full: '../../../assets/images/ui/svg/star-full.svg',
  };

  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getReviews().subscribe((res: any) => {
      this.userReview.set(res.data);
    });
  }

  ngAfterViewInit() {
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
            spacing: 5,
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

    this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
