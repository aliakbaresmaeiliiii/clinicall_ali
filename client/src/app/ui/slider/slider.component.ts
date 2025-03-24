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
  BehaviorSubject,
  debounceTime,
  interval,
  Observable,
  switchMap,
  takeWhile
} from 'rxjs';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { ElasticSearchService } from '../../shared/services/elastic-search.service';

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
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<any>;
  doctorService = inject(DoctorsService);
  elasticSearchService = inject(ElasticSearchService);
  searchControl = new FormControl('');
  private filterDataSubject = new BehaviorSubject<any[]>([]);  
  filterData: Observable<any[]> = this.filterDataSubject.asObservable();

  isLoading = false;
  ngOnInit(): void {
    this.incrementCounter();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
    AOS.refresh();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((query: any) => {
          this.isLoading = true;
          return this.elasticSearchService.searchDoctors(query);
        })
      )
      .subscribe((res: any) => {
     this.filterDataSubject.next(res); 
        console.log(res);

        this.isLoading = false;
      });
  }

  onSelectDoctor(data: any) {}

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
