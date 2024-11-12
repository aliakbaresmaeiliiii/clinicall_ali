import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject, output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../core/auth/components/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          transition: '500ms',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
          transition: '500ms',
        })
      ),
      transition('open => closed', [animate('1s ease-in-out')]),
      transition('closed => open', [animate('1s ease-in-out')]),
    ]),
    trigger('bgColorChange', [
      state(
        'default',
        style({
          backgroundColor: '#fff',
        })
      ),
      state(
        'scrolled',
        style({
          backgroundColor: '#002570',
        })
      ),
      transition('default => scrolled', [animate('1s ease')]),
      transition('scrolled => default', [animate('1s ease')]),
    ]),
  ],
})
export class HeaderComponent {
  navbarVisible = signal(true);
  dialog = inject(MatDialog);
  router = inject(Router);
  userData: string = '';

  private lastScrollPosition = 0;
  bgColor: string = 'default';
  drawer = output<boolean>();

  progressValue = output<number | string>();
  progressValue$: any;

  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    if (typeof localStorage !== 'undefined') {
      const getStoreItem = localStorage.getItem('userData');
      if (getStoreItem) {
        const getItem = JSON.parse(getStoreItem);
        this.userData = getItem.userName;
      }
    }
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

  loginUser() {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }
}
