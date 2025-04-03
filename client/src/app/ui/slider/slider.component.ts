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
  NgZone,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import AOS from 'aos';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  interval,
  Observable,
  of,
  switchMap,
  takeWhile,
} from 'rxjs';
import { environment } from '../../environments/environment';
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
  urlIcon = {
    empty: '../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../assets/images/ui/svg/star-half.svg',
    full: '../../../assets/images/ui/svg/star-full.svg',
  };

  router = inject(Router);
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
  selectedStore = signal<any>('');
  recognition: any;
  isLoading = false;
  isListening = false;
  recognizedText = '';

  // filterDataSubject = new BehaviorSubject<{
  //   doctors: any[];
  //   clinics: any[];
  //   specializations: any[];
  // }>({ doctors: [], clinics: [], specializations: [] });

  filterDataSignal = signal<{
    doctors: any[];
    clinics: any[];
    specializations: any[];
  }>({ doctors: [], clinics: [], specializations: [] });

  // filterData$: Observable<{
  //   doctors: any[];
  //   clinics: any[];
  //   specializations: any[];
  // }> = this.filterDataSubject.asObservable();

  constructor(private ngZone: NgZone) {
    setTimeout(() => {
      this.recognition.stop();
    }, 5000);
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      this.recognizedText = event.results[0][0].transcript;
      this.ngZone.run(() => {
        this.searchControl.setValue(this.recognizedText);
        this.isListening = false;
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  ngOnInit(): void {
    this.incrementCounter();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
    AOS.refresh();
    this.initializeSearch();
  }

  initializeSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: any) => {
          if (!query.trim()) {
            this.filterDataSignal.set({
              doctors: [],
              clinics: [],
              specializations: [],
            });
            return of({ doctors: [], clinics: [], specializations: [] });
            // this.filterDataSubject.next([]);
            // return of([]);
          }
          this.isLoading = true;
          return this.elasticSearchService.searchDoctors(query).pipe(
            finalize(() => (this.isLoading = false)),
            catchError(() =>
              of({ doctors: [], clinics: [], specializations: [] })
            )
          );
        })
      )
      .subscribe((res: any) => {
        if (res) {
          console.log('this.res',res);

          res.doctors =
            res.doctors?.map((doctor: any) => ({
              ...doctor,
              profile_img: doctor.details.profile_img
                ? `${environment.urlProfileImg}${doctor.details.profile_img}`
                : '../../../assets/images/default-profile.png',
            })) || [];

          this.filterDataSignal.set(res);
          console.log('this.filterDataSubject', this.filterDataSignal());
        }
      });
  }

  navigateToDetial(selectedDoctor: any) {
    if (!selectedDoctor) return;
    const doctorName = selectedDoctor.name;
    const id = selectedDoctor.id;
    this.router.navigate([`/doctor/${doctorName}/${id}`]);
  }

  highlightText(text: string): string {
    if (!text || !this.searchControl.value) return text;
    const searchText = this.searchControl.value.trim();
    const regex = new RegExp(searchText, 'gi');
    return text.replace(
      regex,
      match => `<mark class="bg-yellow-300 px-1 rounded">${match}<mark/>`
    );
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
  startVoiceSearch() {
    this.isListening = true;

    this.recognition.start();
  }
  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }
}
