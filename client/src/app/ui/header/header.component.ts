import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  signal
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)',
        transition: '500ms',
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-100%)', 
        transition: '500ms',

      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s ease-in-out')
      ]),
    ]),
    trigger('bgColorChange', [
      state('default', style({
        backgroundColor: '#fff'
      })),
      state('scrolled', style({
        backgroundColor: '#002570'
      })),
      transition('default => scrolled', [
        animate('1s ease')
      ]),
      transition('scrolled => default', [
        animate('1s ease')
      ])
    ])
  ]
})
export class HeaderComponent {
  navbarVisible = signal(true);
  private lastScrollPosition = 0;
  bgColor: string = 'default';

  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  onWindowScroll(): void {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > this.lastScrollPosition) {
      this.bgColor = 'scrolled';
      this.navbarVisible.set(false);
    } else if (currentScrollPosition === 0) {
      this.bgColor = 'default';
      this.navbarVisible.set(true);
    }
    this.lastScrollPosition = currentScrollPosition;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }
}
