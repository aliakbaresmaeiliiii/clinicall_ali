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
  availableTimes: DoctorScheduleTimeAvailability[] = [];
  days: { label: string; date: Date }[] = [];
  @ViewChild('sliderRef', { static: false })
  sliderRef!: ElementRef<HTMLElement>;
  datePipe = inject(DatePipe);
  slider!: KeenSliderInstance;
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  selectedIndex: number | null = null;
  // test
  schedules: DoctorScheduleAvailability[] = [];
  closestSchedule: DoctorScheduleAvailability | null = null;
  today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  bookingStatus = BookingStatus;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    const { doctor_id, consultationType } = this.data;
    this.loadDoctorData(doctor_id, consultationType);
  }
  private loadDoctorData(doctor_id: number, consultationType: string): void {
    this.fetchData(doctor_id);
    this.fetchDoctorScheduleAvailability(doctor_id, consultationType);
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

  fetchDoctorScheduleAvailability(doctor_id: number, text: string) {
    this.schedulesService
      .fetchDoctorScheduleAvailability(doctor_id, text)
      .subscribe((res: any) => {
        this.doctorScheduleAvailability = res.data.map((item: any) => ({
          ...item,
          weekday: this.datePipe.transform(item.availableDate, 'EEEE'), // Extract weekday
          formattedDate: this.datePipe.transform(item.availableDate, 'MMMM d'),
          isBooked:
            item.isBooked === 1
              ? BookingStatus.Booked
              : BookingStatus.Available,
        }));
        this.selectToday();
      });
  }

  selectToday() {
    this.doctorScheduleAvailability.forEach((item, index) => {
      const receivedStartDate = new Date(item.availableDate);
      const todayDate = moment().local().startOf('day').format('YYYY-MM-DD');
      const availableDate = moment(receivedStartDate)
        .local()
        .startOf('day')
        .format('YYYY-MM-DD');
      if (availableDate === todayDate) {
        const scheduleID = this.doctorScheduleAvailability[index]?.scheduleID;
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
          this.availableTimes = result.data.map((item: any) => ({
            ...item,
            formattedTime: item.availableTime.split(':').slice(0, 2).join(':'),
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

  bookedTime(bookeData: DoctorScheduleTimeAvailability) {
    const timeID = bookeData.timeID;
    this.schedulesService.markAsBooked(timeID).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.toast.success('Your booking has been successfully confirmed.');

          // Check if selectedIndex is a valid number
          if (
            typeof this.selectedIndex === 'number' &&
            this.availableTimes.length
          ) {
            const scheduleID =
              this.doctorScheduleAvailability[this.selectedIndex]?.scheduleID;
            if (scheduleID) {
              this.fetchDoctorScheduleTimeAvailability(
                scheduleID,
                this.selectedIndex
              );
            }
          }

          // Refresh the entire schedule availability
          const { doctor_id, consultationType } = this.data;
          this.fetchDoctorScheduleAvailability(doctor_id, consultationType);
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
        perView: 4,
        spacing: 5,
      },
    });
    this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
