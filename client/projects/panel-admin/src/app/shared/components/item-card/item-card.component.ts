import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../chip/chip.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ChipComponent, ButtonComponent],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  loading = true;
  @Input({ required: true }) item!: Item;

  @Input() tags: string[] = [];

  @Output() purchased = new EventEmitter<Item>();

  onPurchase() {
    this.purchased.next(this.item);
    this.loading = false;
  }
}
