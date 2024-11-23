import { Component, input } from '@angular/core';

@Component({
    selector: 'app-card-info',
    templateUrl: './card-info.component.html',
    styleUrl: './card-info.component.scss',
    standalone: false
})
export class CardInfoComponent {
  title = input<string>();
  subtitle = input<string>();
  description = input<string>();
  paragraph = input<string>();
  image = input<string>();
}
