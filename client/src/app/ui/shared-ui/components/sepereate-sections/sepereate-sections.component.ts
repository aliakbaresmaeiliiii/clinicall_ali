import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sepereate-sections',
  templateUrl: './sepereate-sections.component.html',
  styleUrl: './sepereate-sections.component.scss',
})
export class SepereateSectionsComponent {
  title = input<string>('');
  description = input<string>('');
  count = input<number>(0);
}
