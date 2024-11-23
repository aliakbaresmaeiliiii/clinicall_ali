import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { map, Observable, shareReplay } from 'rxjs';

const style1 = style({
  opacity: 1,
  transform: 'translateX(0)',
});

const style2 = style({
  opacity: 0,
  transform: 'translateX(-100%)',
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('foobar', [
      state('show', style1),
      state('hide', style2),
      transition('show => hide', animate('1.2s ease-out')),
      transition('hide => show', animate('1.2s ease-in')),
    ]),
  ],
  standalone: false,
})
export class HomeComponent {
  state = 'hide';
  el = inject(ElementRef);
  fb = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);
  readonly drawer = viewChild.required<MatSidenav>('drawer');
  events: string[] = [];
  opened!: boolean;
  isDrawerOpen = signal(true);
  isDesktopMode = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  form = this.fb.group({
    city: [''],
    school: [''],
  });

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.scrollY;
    if (scrollPosition >= componentPosition - 250) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
  }

  toggleDrawer(): void {
    this.drawer().toggle();
  }
}
