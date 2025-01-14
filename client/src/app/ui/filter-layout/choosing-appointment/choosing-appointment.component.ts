import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { environment } from '../../../environments/environment';
import {
  DoctorAvailability,
  DoctorsDTO,
} from '../../../modules/doctors/models/doctors';
import { DoctorsService } from '../../../modules/doctors/services/doctors.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-choosing-appointment',
  standalone: false,
  templateUrl: './choosing-appointment.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './choosing-appointment.component.scss',
  ],
})
export class ChoosingAppointmentComponent implements OnInit, AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<ChoosingAppointmentComponent>);
  readonly data = inject<DoctorAvailability>(MAT_DIALOG_DATA);
  service = inject(DoctorsService);
  doctorInfo: DoctorsDTO[] = [];
  doctorAvailable: DoctorAvailability[] = [];
  days: { label: string; date: Date }[] = [];
  @ViewChild('sliderRef', { static: false })
  sliderRef!: ElementRef<HTMLElement>;
  datePipe = inject(DatePipe);
  slider!: KeenSliderInstance;
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.generateWeek();

    const { doctor_id, consultationType } = this.data;

    if (!doctor_id) {
      console.error('doctorId is missing.');
      return;
    }

    this.loadDoctorData(doctor_id, consultationType);
  }
  private loadDoctorData(doctor_id: number, consultationType: string): void {
    this.fetchData(doctor_id);
    this.fetchDoctorAvailability(doctor_id, consultationType);
  }

  fetchData(doctorId: number) {
    this.service.doctorDetial(doctorId).subscribe({
      next: (response: any) => {
        console.log('response', response);
        if (response && response.length > 0) {
          const newData = response.map((patient: any) => {
            patient.profileImage = patient.profileImage
              ? `${environment.urlProfileImg}${patient.profileImage}`
              : '../../../../assets/images/bg-01.png';
            return patient;
          });
          this.doctorInfo = newData;
          console.log('this.doctorInfo', this.doctorInfo);
        }
      },

      error: e => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  fetchDoctorAvailability(doctor_id: number, text: string) {
    this.service
      .getDoctorAvailability(doctor_id, text)
      .subscribe((res: any) => {
        this.doctorAvailable = res.data.map((item: any) => ({
          ...item,
          weekday: this.datePipe.transform(item.availableDate, 'EEEE'), // Extract weekday
          formattedDate: this.datePipe.transform(
            item.availableDate,
            'MMMM d'
          ),
        }));
      });
  }

  generateWeek(): void {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      this.days.push({
        label:
          i === 0
            ? 'Today'
            : i === 1
            ? 'Tomorrow'
            : this.getDayName(currentDate),
        date: currentDate,
      });
    }
  }

  getDayName(date: Date): string {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return daysOfWeek[date.getDay()];
  }

  ngAfterViewInit() {
    const checkSliderInterval = setInterval(() => {
      if (this.sliderRef?.nativeElement && this.days.length > 0) {
        clearInterval(checkSliderInterval);
        this.initializeSlider();
      }
    }, 100);
  }

  initializeSlider() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      initial: this.currentSlide,
      slideChanged: s => {
        this.currentSlide = s.track.details.rel;
      },
      mode: 'free-snap',
      slides: {
        perView: 5,
        spacing: 5,
      },
    });
    this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
