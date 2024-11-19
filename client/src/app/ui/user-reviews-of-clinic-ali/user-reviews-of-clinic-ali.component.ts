import { Component, input, signal } from '@angular/core';
import { UserReviews } from './model/users-review';

@Component({
  selector: 'app-user-reviews-of-clinic-ali',
  templateUrl: './user-reviews-of-clinic-ali.component.html',
  styleUrl: './user-reviews-of-clinic-ali.component.scss',
})
export class UserReviewsOfClinicAliComponent {
  name = input<string>();
  star = input<number>();
  description = input<string>();
  date = input<string>();
}
