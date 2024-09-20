import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { interval, takeWhile } from 'rxjs';
import { CounterService } from '../../../ui/shared-ui/services/counter.service';

@Directive({
  selector: '[appCounter]',
  standalone: true,
})
export class CounterDirective implements OnInit {
  counter = input<number>(0);
  counterService = inject(CounterService);

  el = inject(ElementRef);

  constructor() {
    effect(() => {
      this.updateCounter();
    });
  }

  ngOnInit(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter() < this.counterService.maxCounter()))
      .subscribe(() => {
        this.updateCounter();
      });
  }

  updateCounter(): void {
    this.el.nativeElement.innerText = this.counter();
  }
}
