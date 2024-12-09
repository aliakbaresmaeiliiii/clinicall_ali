import { Component, input, signal } from '@angular/core';
import { UserReviews } from './model/users-review';
import Swiper from 'swiper';

@Component({
    selector: 'app-user-reviews-of-clinic-ali',
    templateUrl: './user-reviews-of-clinic-ali.component.html',
    styleUrl: './user-reviews-of-clinic-ali.component.scss',
    standalone: false
})
export class UserReviewsOfClinicAliComponent {
  name = input<string>();
  star = input<number>();
  description = input<string>();
  date = input<string>();

  userReview = [
    {
      name: 'John Doe',
      star: 5,
      description: 'Excellent service and very professional staff.',
      date: '2024-11-01',
    },
    {
      name: 'Emily Smith',
      star: 4,
      description: 'Great experience, but the waiting time could be improved.',
      date: '2024-11-02',
    },
    {
      name: 'Michael Brown',
      star: 3,
      description: 'Decent care but lacked proper follow-up.',
      date: '2024-11-03',
    },
    {
      name: 'Sarah Johnson',
      star: 5,
      description: 'Very friendly and knowledgeable doctors.',
      date: '2024-11-04',
    },
    {
      name: 'David Wilson',
      star: 4,
      description: 'Clean facility with good care provided.',
      date: '2024-11-05',
    },
    {
      name: 'Anna Martinez',
      star: 2,
      description: 'Service was slow and the staff seemed unorganized.',
      date: '2024-11-06',
    },
    {
      name: 'James Taylor',
      star: 5,
      description: 'Quick diagnosis and excellent treatment.',
      date: '2024-11-07',
    },
    {
      name: 'Sophia Anderson',
      star: 4,
      description:
        'Doctors were great, but the clinic needs better parking options.',
      date: '2024-11-08',
    },
    {
      name: 'Robert Thomas',
      star: 1,
      description: 'Had a very bad experience; not recommended.',
      date: '2024-11-09',
    },
    {
      name: 'Olivia Lee',
      star: 5,
      description: 'Exceptional service and very caring staff.',
      date: '2024-11-10',
    },
    {
      name: 'William Garcia',
      star: 3,
      description: 'The doctor was good, but the reception staff were rude.',
      date: '2024-11-11',
    },
    {
      name: 'Ava Davis',
      star: 5,
      description: 'Highly recommend this clinic. Great experience!',
      date: '2024-11-12',
    },
    {
      name: 'Alexander Martinez',
      star: 2,
      description: 'Too expensive for the quality of service provided.',
      date: '2024-11-13',
    },
    {
      name: 'Isabella White',
      star: 4,
      description: 'Good clinic, but it could be better organized.',
      date: '2024-11-14',
    },
    {
      name: 'Noah Harris',
      star: 5,
      description: 'Amazing service. Thank you for taking care of me!',
      date: '2024-11-15',
    },
    {
      name: 'Mia Robinson',
      star: 4,
      description:
        'Doctors were professional, but the waiting time was too long.',
      date: '2024-11-16',
    },
    {
      name: 'Liam Clark',
      star: 3,
      description: 'Average experience. The clinic could improve its hygiene.',
      date: '2024-11-17',
    },
    {
      name: 'Ella Lewis',
      star: 5,
      description: 'Fantastic clinic. Highly efficient and caring team.',
      date: '2024-11-18',
    },
    {
      name: 'Benjamin Walker',
      star: 2,
      description: 'Not satisfied with the treatment received.',
      date: '2024-11-19',
    },
    {
      name: 'Charlotte Young',
      star: 4,
      description:
        'Good experience overall, but the billing process needs improvement.',
      date: '2024-11-20',
    },
  ];

  ngAfterViewInit(): void {
    this.initializeServiceSwiper();
  }
  ngOnInit(): void {}

  initializeServiceSwiper(): void {
    new Swiper('.aliSwiper', {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      autoplay:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
