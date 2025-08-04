import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingOptions } from 'ali';

interface Rating {
  reviewText: string;
  reviewRating: RatingOptions;
}
@Component({
  selector: 'app-rating-picker-page',
  templateUrl: './rating-picker-page.component.html',
  styleUrl: './rating-picker-page.component.scss',
  standalone: false,
})
export class RatingPickerPageComponent {
  fb = inject(FormBuilder);

  form = this.fb.group<Rating>({
    reviewText: '',
    reviewRating: 'great',
  });

  ngOnInit(): void {}

  onSubmit() {
    this.form.reset();
  }
}
