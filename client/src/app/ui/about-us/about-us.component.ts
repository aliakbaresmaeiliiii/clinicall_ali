import {
  Component,
  effect,
  ElementRef,
  Renderer2,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  styles: [
    `
      .item {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.5s, transform 0.5s;
      }
      .item.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `,
  ],
})
export class AboutUsComponent {

}
