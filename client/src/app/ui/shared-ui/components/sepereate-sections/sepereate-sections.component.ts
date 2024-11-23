import { Component, input } from '@angular/core';

@Component({
    selector: 'app-sepereate-sections',
    templateUrl: './sepereate-sections.component.html',
    styleUrl: './sepereate-sections.component.scss',
    standalone: false
})
export class SepereateSectionsComponent {
  title = input<string>('');
  description = input<string>('');
  count = input<number>(0);
}
