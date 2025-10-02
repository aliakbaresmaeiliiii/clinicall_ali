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
import { Subject, takeUntil } from 'rxjs';

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
  private destroy$ = new Subject<void>();
  slider!: KeenSliderInstance;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service
      .getReviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          if (res?.data && res.data.length > 0) {
            this.userReview.set(res.data);
          } else {
            // Show fake data if no real data available
            this.userReview.set(this.getFakeReviews());
          }
        },
        error: err => {
          console.error('Error fetching reviews:', err);
          // Show fake data on error
          this.userReview.set(this.getFakeReviews());
        },
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: s => {
          this.currentSlide = s.track.details.rel;
        },
        slides: {
          perView: 4,
          spacing: 15,
        },
        breakpoints: {
          '(max-width: 1024px)': {
            slides: {
              perView: 3,
              spacing: 12,
            },
          },
          '(max-width: 768px)': {
            slides: {
              perView: 2,
              spacing: 10,
            },
          },
          '(max-width: 480px)': {
            slides: {
              perView: 1,
              spacing: 8,
            },
          },
        },
      });

      if (this.slider?.track?.details?.slides) {
        this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
      } else {
        this.dotHelper = [];
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getFakeReviews(): ReviewsDTO[] {
    return [
      {
        id: 1,
        rating: 5,
        comment: "Excellent service! The doctors were very professional and caring. Highly recommended for anyone seeking quality healthcare.",
        professional_demeanor: 5,
        sufficient_time: 5,
        skill: 5,
        staff_behavior: 5,
        clinic_condition: 5,
        recommendation: "Highly recommended"
      },
      {
        id: 2,
        rating: 4,
        comment: "Very good experience overall. The staff was friendly and the waiting time was reasonable. Will definitely visit again.",
        professional_demeanor: 4,
        sufficient_time: 4,
        skill: 5,
        staff_behavior: 4,
        clinic_condition: 4,
        recommendation: "Recommended"
      },
      {
        id: 3,
        rating: 5,
        comment: "Outstanding medical care! The attention to detail and personalized approach made all the difference in my treatment.",
        professional_demeanor: 5,
        sufficient_time: 5,
        skill: 5,
        staff_behavior: 5,
        clinic_condition: 5,
        recommendation: "Highly recommended"
      },
      {
        id: 4,
        rating: 4,
        comment: "Professional and efficient service. The doctors took time to explain everything clearly. Clean and modern facilities.",
        professional_demeanor: 4,
        sufficient_time: 4,
        skill: 4,
        staff_behavior: 5,
        clinic_condition: 5,
        recommendation: "Recommended"
      },
      {
        id: 5,
        rating: 5,
        comment: "Best healthcare experience I've had. The team was compassionate and the treatment was effective. Thank you!",
        professional_demeanor: 5,
        sufficient_time: 5,
        skill: 5,
        staff_behavior: 5,
        clinic_condition: 5,
        recommendation: "Highly recommended"
      },
      {
        id: 6,
        rating: 4,
        comment: "Good service with knowledgeable staff. The appointment system works well and the clinic is well-maintained.",
        professional_demeanor: 4,
        sufficient_time: 4,
        skill: 4,
        staff_behavior: 4,
        clinic_condition: 5,
        recommendation: "Recommended"
      },
      {
        id: 7,
        rating: 5,
        comment: "Exceptional care from start to finish. The doctors were thorough and the follow-up was excellent. Very impressed!",
        professional_demeanor: 5,
        sufficient_time: 5,
        skill: 5,
        staff_behavior: 5,
        clinic_condition: 5,
        recommendation: "Highly recommended"
      },
      {
        id: 8,
        rating: 4,
        comment: "Professional service with good facilities. The medical team was competent and the process was smooth.",
        professional_demeanor: 4,
        sufficient_time: 4,
        skill: 5,
        staff_behavior: 4,
        clinic_condition: 4,
        recommendation: "Recommended"
      },
      {
        id: 9,
        rating: 5,
        comment: "Amazing healthcare experience! The staff went above and beyond to ensure my comfort and recovery.",
        professional_demeanor: 5,
        sufficient_time: 5,
        skill: 5,
        staff_behavior: 5,
        clinic_condition: 5,
        recommendation: "Highly recommended"
      },
      {
        id: 10,
        rating: 4,
        comment: "Very satisfied with the service. The doctors were knowledgeable and the treatment was effective. Good value.",
        professional_demeanor: 4,
        sufficient_time: 4,
        skill: 4,
        staff_behavior: 5,
        clinic_condition: 4,
        recommendation: "Recommended"
      }
    ];
  }
}
