
import { effect, inject, Injectable, signal, DOCUMENT } from '@angular/core';

export type Theme = 'blue-light' | 'blue-dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  theme = signal<Theme>('blue-light');
  private _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      if (this.theme() === 'blue-light') {
        this._document.documentElement.classList.remove('blue-dark');
        this._document.documentElement.classList.add('blue-light');
        // Also remove violet classes if they exist
        this._document.documentElement.classList.remove('violet-dark');
        this._document.documentElement.classList.remove('violet-light');
      } else {
        this._document.documentElement.classList.remove('blue-light');
        this._document.documentElement.classList.add('blue-dark');
        // Also remove violet classes if they exist
        this._document.documentElement.classList.remove('violet-dark');
        this._document.documentElement.classList.remove('violet-light');
      }
    });
  }
  
  toggleTheme() {
    this.theme.update(value => {
      return value === 'blue-light' ? 'blue-dark' : 'blue-light';
    });
  }
}
