import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-scroll-progress-bar',
    imports: [MatProgressBarModule, CommonModule],
    templateUrl: './app-scroll-progress-bar.component.html',
    styleUrl: './app-scroll-progress-bar.component.scss'
})
export class AppScrollProgressBarComponent {
  scrollPercentage: number = 0;
  value = 0;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const math = Math.round((scrollOffset / windowHeight) * 100);
    this.scrollPercentage = Math.min(math, 100);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
