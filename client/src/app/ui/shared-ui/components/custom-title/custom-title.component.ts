import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-title',
  standalone: false,
  templateUrl: './custom-title.component.html',
  styleUrl: './custom-title.component.scss',
})
export class CustomTitleComponent {
  counter = input<number>();
  subtitle = input<string>();
  title = input<string>();
}
