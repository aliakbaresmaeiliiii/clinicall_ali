import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  maxCounter = signal<number>(20);

  updateMaxCounter(newMax: number) {
    this.maxCounter.set(newMax);
  }
}
