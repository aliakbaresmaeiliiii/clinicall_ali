import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-suggestions-psychology-tips',
  standalone: false,
  templateUrl: './suggestions-psychology-tips.component.html',
  styleUrl: './suggestions-psychology-tips.component.scss',
})
export class SuggestionsPsychologyTipsComponent implements AfterViewInit {
  psychologyTips = [
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/1.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Hope Counseling Center',
      address: '123 Wellness Street, Kuala Lumpur, Malaysia',
      userReviews: [
        'Excellent service and professional counselors!',
        'A very supportive environment for personal growth.',
      ],
      starRating: 4.8,
      promotion: '20% Off',
      pricePerSession: '4000$',
      tip: 'In-person individual counseling to improve mental well-being.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/2.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Peaceful Minds Therapy',
      address: '456 Serenity Avenue, Johor Bahru, Malaysia',
      userReviews: [
        'Great therapists who really listen.',
        'Highly recommended for stress management.',
      ],
      starRating: 4.7,
      promotion: '20% Off',
      pricePerSession: '60$ (60-minute session)',
      tip: 'Group therapy sessions to build resilience and community support.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/3.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Harmony Psychological Services',
      address: '789 Balance Road, Penang, Malaysia',
      userReviews: [
        'Helped me overcome anxiety with practical techniques.',
        'The atmosphere is very calming and welcoming.',
      ],
      starRating: 4.6,
      promotion: '20% Off',
      pricePerSession: '50$ (45-minute session)',
      tip: 'Online therapy options available for convenience.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/4.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Mindful Journey Center',
      address: '10 Peace Lane, Malacca, Malaysia',
      userReviews: [
        'Their mindfulness sessions are life-changing.',
        'Friendly staff and highly skilled psychologists.',
      ],
      starRating: 4.9,
      promotion: '20% Off',
      pricePerSession: '65$ (60-minute session)',
      tip: 'Specializes in mindfulness and stress reduction therapies.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/5.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Bright Horizons Therapy',
      address: '55 Positive Way, Ipoh, Malaysia',
      userReviews: [
        'Helped me with effective anger management techniques.',
        'I feel more in control of my emotions.',
      ],
      starRating: 4.5,
      promotion: '20% Off',
      pricePerSession: '80$ (60-minute session)',
      tip: 'Focus on emotional regulation and positive thinking.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/6.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Balance Mental Health Clinic',
      address: '32 Stability Drive, Kuching, Malaysia',
      userReviews: [
        'Highly recommended for work-life balance issues.',
        'I gained valuable insights into my personal challenges.',
      ],
      starRating: 4.7,
      promotion: '20% Off',
      pricePerSession: '70$ (60-minute session)',
      tip: 'Tailored programs for work-life balance and productivity.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/7.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Tranquil Thoughts Therapy',
      address: '45 Relaxation Avenue, Kota Kinabalu, Malaysia',
      userReviews: [
        'A peaceful environment for mental relaxation.',
        'Therapists are incredibly empathetic and understanding.',
      ],
      starRating: 4.8,
      promotion: '20% Off',
      pricePerSession: '55$ (45-minute session)',
      tip: 'Relaxation techniques and anxiety management sessions.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/8.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Healing Minds Counseling',
      address: '89 Recovery Street, Shah Alam, Malaysia',
      userReviews: [
        'Helped me heal from past trauma.',
        'The staff is very caring and supportive.',
      ],
      starRating: 4.9,
      promotion: '20% Off',
      pricePerSession: '90$ (75-minute session)',
      tip: 'Specialized in trauma recovery and emotional healing.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/9.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Insight Therapy Center',
      address: '12 Clarity Boulevard, Putrajaya, Malaysia',
      userReviews: [
        'I gained new perspectives on my challenges.',
        'Their insights were very impactful for my growth.',
      ],
      starRating: 4.7,
      promotion: '20% Off',
      pricePerSession: '75$ (60-minute session)',
      tip: 'Provides clarity and insight into personal issues.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/10.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Serene Path Counseling',
      address: '34 Calm Road, George Town, Malaysia',
      userReviews: [
        'The sessions improved my confidence greatly.',
        'Very professional and compassionate service.',
      ],
      starRating: 4.6,
      promotion: '20% Off',
      pricePerSession: '85$ (60-minute session)',
      tip: 'Building self-esteem and confidence through therapy.',
    },
    // Additional entries follow the same format...
  ];

  ngAfterViewInit(): void {
    this.initializeServiceSwiper();
  }
  ngOnInit(): void {}

  initializeServiceSwiper(): void {
    console.log('Initializing Service Swiper...');
    new Swiper('.psychologySwiper', {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
