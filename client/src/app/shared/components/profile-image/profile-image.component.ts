import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  standalone: false,
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProfileImageComponent {
  imageUrl = input<string>('');
  size = input<number>(20);
  borderColor = input<string>('from-blue-500 via-blue-600 to-blue-800');
}
