import { DatePipe, formatDate } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
})
export class ChoosingAppointmentComponent implements OnInit, AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<ChoosingAppointmentComponent>);
  readonly data = inject<DoctorScheduleAvailability>(MAT_DIALOG_DATA);
  service = inject(DoctorsService);
  toast = inject(ToastrService);
  schedulesService = inject(ScheduleService);
  cdr = inject(ChangeDetectorRef);
  doctorInfo: DoctorsDTO[] = [];
  doctorScheduleAvailability: DoctorScheduleAvailability[] = [];
  available_time: DoctorScheduleTimeAvailability[] = [];
  days: { label: string; date: Date }[] = [];
  @ViewChild('sliderRef', { static: false })
  sliderRef!: ElementRef<HTMLElement>;
  slider!: KeenSliderInstance;
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  selectedIndex: number | null = null;
  // test
  schedules: DoctorScheduleAvailability[] = [];
  closestSchedule: DoctorScheduleAvailability | null = null;
  today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
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
    const { doctor_id, consultation_types } = this.data;
    this.loadDoctorData(doctor_id, consultation_types);
  }
  private loadDoctorData(doctor_id: number, consultation_types: string): void {
    this.fetchData(doctor_id);
    this.fetchDoctorScheduleAvailability(doctor_id, consultation_types);
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

  fetchDoctorScheduleAvailability(
    doctor_id: number,
    consultation_types: string
  ) {
    this.schedulesService
      .fetchDoctorScheduleAvailability(doctor_id, consultation_types)
      .subscribe((res: any) => {
        console.log('schedule', res.data);
        this.doctorScheduleAvailability = res.data.map((item: any) => ({
          ...item,
          // weekday: this.datePipe.transform(item.avaliable_date, 'EEEE'), // Extract weekday
          // formattedDate: this.datePipe.transform(item.avaliable_date, 'MMMM d'),
          is_booked:
            item.is_booked === 1
              ? BookingStatus.is_booked
              : BookingStatus.is_available,
        }));
        console.log(
          'doctorScheduleAvailability',
          this.doctorScheduleAvailability
        );

        this.selectToday();
      });
  }

  selectToday() {
    this.doctorScheduleAvailability.forEach((item, index) => {
      const receivedStartDate = new Date(item.appointment_date);
      const todayDate = moment().local().startOf('day').format('YYYY-MM-DD');
      const availableDate = moment(receivedStartDate)
        .local()
        .startOf('day')
        .format('YYYY-MM-DD');
      if (availableDate === todayDate) {
        const scheduleID = this.doctorScheduleAvailability[index]?.id;
        if (scheduleID) {
          this.fetchDoctorScheduleTimeAvailability(scheduleID, index);
        }
      }
    });
  }

  fetchDoctorScheduleTimeAvailability(scheduleID: any, index: number) {
    this.selectedIndex = index;
    this.schedulesService
      .doctorScheduleTimeAvailability(scheduleID)
      .pipe(take(1))
      .subscribe({
        next: (result: any) => {
          console.log('schedule', result.data);

          this.available_time = result.data.map((item: any) => ({
            ...item,
            formattedTime: item.available_time.split(':').slice(0, 2).join(':'),
            timeID: item.timeID,
          }));
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
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
            const scheduleID =
              this.doctorScheduleAvailability[this.selectedIndex]?.scheduleID;
            if (scheduleID) {
              this.selectToday();
            }
          }

          // Refresh the entire schedule availability
          const { doctor_id, consultation_types } = this.data;
          this.fetchDoctorScheduleAvailability(doctor_id, consultation_types);
        }
      },
      error: e => {
        this.toast.error(e);
      },
      complete: () => {
        console.log('Booking process complete');
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
