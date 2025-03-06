import { DatePipe, formatDate } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { environment } from '../../../environments/environment';
import {
  BookingStatus,
  DoctorScheduleAvailability,
  DoctorScheduleTimeAvailability,
  DoctorsDTO,
} from '../../../modules/doctors/models/doctors';
import { DoctorsService } from '../../../modules/doctors/services/doctors.service';
import { ScheduleService } from '../../../modules/doctors/services/schedule.service';
import moment from 'moment';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-choosing-appointment',
  standalone: false,
  templateUrl: './choosing-appointment.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './choosing-appointment.component.scss',
  ],
  providers:[DatePipe]
})
export class ChoosingAppointmentComponent implements OnInit, AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<ChoosingAppointmentComponent>);
  readonly data = inject<DoctorScheduleAvailability>(MAT_DIALOG_DATA);
  service = inject(DoctorsService);
  toast = inject(ToastrService);
  schedulesService = inject(ScheduleService);
  cdr = inject(ChangeDetectorRef);
  doctorInfo = signal<DoctorsDTO[]>([]);
  doctorScheduleAvailability: DoctorScheduleAvailability[] = [];
  available_time: DoctorScheduleTimeAvailability[] = [];
  days: { label: string; date: Date }[] = [];
  @ViewChild('sliderRef', { static: false })
  sliderRef!: ElementRef<HTMLElement>;
  slider!: KeenSliderInstance;
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  selectedIndex: number | null = null;
  datePipe = inject(DatePipe)
  // test
  bookingStatus = BookingStatus;
  bookedId!: number;

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.initializeKeenSlider();
  }

  initializeKeenSlider() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: s => {
          this.currentSlide = s.track.details.rel;
        },
        slides: {
          perView: 4,
          spacing: 5,
        },
        breakpoints: {
          '(max-width: 1024px)': {
            slides: {
              perView: 3,
            },
          },
          '(max-width: 768px)': {
            slides: {
              perView: 2,
              spacing: 8,
            },
          },
          '(max-width: 480px)': {
            slides: {
              perView: 1,
              spacing: 5,
            },
          },
        },
      });
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ];
    }, 500);
  }
  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    const { doctor_id, consultatio_types_available } = this.data;
    this.loadDoctorData(doctor_id, consultatio_types_available);
  }
  private loadDoctorData(doctor_id: number, consultatio_types_available: string): void {
    this.fetchData({doctor_id});
    this.fetchDoctorScheduleAvailability(doctor_id, consultatio_types_available);
  }

  fetchData(filter: { doctor_id: number }) {
    this.service.getDoctors(filter).subscribe({
      next: (response: any) => {
        if (response && response.data.length > 0) {
          const newData = response.data.map((img: any) => {
            img.profile_img = img.profile_img
            ? `${environment.urlProfileImg}${img.profile_img}`
            : '../../../../assets/images/bg-01.png';
            
            return img;
          });
          this.doctorInfo.set(newData);
        }
      },

      error: e => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  fetchDoctorScheduleAvailability(
    doctor_id: number,
    consultatio_types_available: string
  ) {
    this.schedulesService
      .fetchDoctorScheduleAvailability(doctor_id, consultatio_types_available)
      .subscribe((res: any) => {
        console.log(res.data)
        this.doctorScheduleAvailability = res.data.map((item: any) => ({
          ...item,
          weekday: this.datePipe.transform(item.avaliable_date, 'EEEE'), // Extract weekday
          formattedDate: this.datePipe.transform(item.avaliable_date, 'MMMM d'),
          is_booked:
            item.is_booked === 1
              ? BookingStatus.is_booked
              : BookingStatus.is_available,
        }));
        this.selectToday();
      });
  }

  selectToday() {
    this.doctorScheduleAvailability.forEach((item, index) => {
      this.selectedIndex = index
      debugger;
      const receivedStartDate = new Date(item.avaliable_date);
      const todayDate = moment().local().startOf('day').format('YYYY-MM-DD');
      const availableDate = moment(receivedStartDate)
        .local()
        .startOf('day')
        .format('YYYY-MM-DD');
      if (availableDate === todayDate) {
        const schedule_id = this.doctorScheduleAvailability[index]?.id;
        if (schedule_id) {
          this.fetchDoctorScheduleTimeAvailability(schedule_id, index);
        }
      }
    });
  }

  fetchDoctorScheduleTimeAvailability(schedule_id: any, index: number) {
    this.selectedIndex = index;
    this.schedulesService
      .doctorScheduleTimeAvailability(schedule_id)
      .pipe(take(1))
      .subscribe({
        next: (result: any) => {
          this.available_time = result.data.map((item: any) => ({
            ...item,
            formattedTime: item.time.split(':').slice(0, 2).join(':'),
            timeID: item.item,
          }));
        },
        error: err => {
        },
        complete: () => {
        },
      });
  }

  selectedTime: unknown = null;

  bookedTime(bookeData: DoctorScheduleTimeAvailability) {
    this.bookedId = bookeData.id;
    if (this.selectedTime === bookeData.id) {
      this.selectedTime = null;
    } else {
      this.selectedTime = bookeData.id;
    }
  }

  submit() {
    const id = this.bookedId;
    this.schedulesService.markAsBooked(id).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.toast.success('Your booking has been successfully confirmed.');
          if (
            typeof this.selectedIndex === 'number' &&
            this.available_time.length
          ) {
            const schedule_id =
              this.doctorScheduleAvailability[this.selectedIndex]?.schedule_id;
            if (schedule_id) {
              this.selectToday();
            }
          }

          // Refresh the entire schedule availability
          const { doctor_id, consultatio_types_available } = this.data;
          this.fetchDoctorScheduleAvailability(doctor_id, consultatio_types_available);
        }
      },
      error: e => {
        this.toast.error(e);
      },
      complete: () => {
      },
    });
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

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
