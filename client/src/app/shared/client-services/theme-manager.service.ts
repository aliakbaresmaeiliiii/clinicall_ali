
import { effect, inject, Injectable, signal, DOCUMENT } from '@angular/core';

export type Theme = 'violet-light' | 'violet-dark ';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  theme = signal<Theme>('violet-light');
  private _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      if (this.theme() === 'violet-light') {
        this._document.documentElement.classList.remove('violet-dark');
        this._document.documentElement.classList.add('violet-light');
      } else {
        this._document.documentElement.classList.remove('violet-light');
        this._document.documentElement.classList.add('violet-dark');
      }
    });
  }
  
  toggleTheme() {
    this.theme.update(value => {
      return value === 'violet-light' ? 'violet-dark ' : 'violet-light';
    });
  }
}
