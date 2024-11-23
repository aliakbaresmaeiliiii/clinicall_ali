import { Component, input } from '@angular/core';

@Component({
    selector: 'app-custom-card',
    imports: [],
    templateUrl: './custom-card.component.html',
    styleUrl: './custom-card.component.scss'
})
export class CustomCardComponent {
  readonly content = input<string>('HELLO');
}
