import { Component, input, output } from '@angular/core';
import { Item } from '../../models/item';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../chip/chip.component';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-item-card',
    imports: [CommonModule, ChipComponent, ButtonComponent],
    templateUrl: './item-card.component.html',
    styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  loading = true;
  readonly item = input.required<Item>();

  readonly tags = input<string[]>([]);

  readonly purchased = output<Item>();

  onPurchase() {
    this.purchased.emit(this.item());
    this.loading = false;
  }
}
