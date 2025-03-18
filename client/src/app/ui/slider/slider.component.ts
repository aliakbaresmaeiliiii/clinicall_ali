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
import { FormControl } from '@angular/forms';
import AOS from 'aos';
import {
  catchError,
  debounceTime,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  takeWhile,
} from 'rxjs';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';

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
  standalone: false,
})
export class SliderComponent implements OnInit {
  state = 'hide';
  counter: number = 0;
  maxCounter: number = 20;
  el = inject(ElementRef);
  searchVisible = true;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<any>;
  doctorService = inject(DoctorsService);

  ngOnInit(): void {
    this.incrementCounter();
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing type
      once: true, // Whether animation should happen only once
    });
    AOS.refresh();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(value => this._filter(value || ''))
    );
  }

  private _filter(query: string): Observable<string[]> {
    if (!query.trim()) {
      return of([]);
    } else {
      return this.doctorService.searchDoctors(query).pipe(
        map((doctors: any) => doctors.map((d: any) => d.name)),
        catchError(error => {
          console.log("❌ Error:", error);
          return of([]);
        })
      );
    }
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

  searchDoctor(searchValue: any): void {
    // this.router.navigate(['doctors'], { queryParams: { search: searchValue } });
  }

  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }
}
