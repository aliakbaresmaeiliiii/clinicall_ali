import { Component, inject, OnInit, ViewChild } from '@angular/core';
import AOS from 'aos';
import { fromEvent, interval, map, pairwise, takeUntil, takeWhile } from 'rxjs';
import { CounterService } from '../shared-ui/services/counter.service';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.scss',
})
export class FeatureSectionComponent implements OnInit {
  counter: number = 0;
  maxCounter: number = 20;
  isLoading = false;

  shoes: any[] = [
    { value: 'boots', name: 'Boots' },
    { value: 'clogs', name: 'Clogs' },
    { value: 'loafers', name: 'Loafers' },
    { value: 'moccasins', name: 'Moccasins' },
    { value: 'sneakers', name: 'Sneakers' },
  ];

  ngOnInit() {
    this.incrementCounter();
    AOS.init({ disable: 'mobile' });
    AOS.refresh();
  }

  showPost() {
    this.isLoading = !this.isLoading;
  }

  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }
}
