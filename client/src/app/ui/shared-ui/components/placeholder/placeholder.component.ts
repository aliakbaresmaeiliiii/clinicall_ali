import { Component, input, signal } from '@angular/core';

@Component({
    selector: 'app-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrl: './placeholder.component.scss',
    standalone: false
})
export class PlaceholderComponent {
  // loadingCards = signal<[]>([]);
  loadingCards = new Array(3);
}
