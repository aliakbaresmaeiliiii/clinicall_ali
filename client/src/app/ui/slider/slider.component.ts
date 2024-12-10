import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import AOS from 'aos';
import { fromEvent, interval, map, take, takeWhile } from 'rxjs';

const style1 = style({
  opacity: 1,
  transform: 'translateX(0)',
});

const style2 = style({
  opacity: 0,
  transform: 'translateX(-100%)',
});

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss',
    animations: [
        trigger('foobar', [
            state('show', style1),
            state('hide', style2),
            transition('show => hide', animate('1.2s ease-out')),
            transition('hide => show', animate('1.2s ease-in')),
        ]),
    ],
    standalone: false
})
export class SliderComponent implements OnInit {
  state = 'hide';
  counter: number = 0;
  maxCounter: number = 20;
  el = inject(ElementRef);

  ngOnInit(): void {
    this.incrementCounter();
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing type
      once: true // Whether animation should happen only once
    });
    AOS.refresh();
  }

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

  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }
}
