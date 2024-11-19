import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  title = input<string>();
  description = input<string>();
  name = input<string>();
  promotion = input<string>();
  price = input<number | string>();
  off = input<string>();
  imgSergury = input<string>();
  doctorImg = input<string>();
}
