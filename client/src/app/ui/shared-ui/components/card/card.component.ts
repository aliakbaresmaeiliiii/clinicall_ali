import { Component, input } from '@angular/core';
import { CardInfo } from '../../models/card-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: false,
})
export class CardComponent {
  prodcutImage = input<string>();
  title = input<string>();
  description = input<string>();
  doctorImage = input<string>();
  doctorName = input<string>();
  star = input<string | number>();
  discount = input<string | number>();
  price = input<number | string>();
  count = input<string | number>();
  address = input<string | number>();
}
