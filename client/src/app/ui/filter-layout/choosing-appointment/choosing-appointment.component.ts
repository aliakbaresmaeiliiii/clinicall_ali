import { DatePipe, formatDate } from '@angular/common';
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
  DoctorScheduleAvailability,
  DoctorScheduleTimeAvailability,
  DoctorsDTO,
} from '../../../modules/doctors/models/doctors';
import { DoctorsService } from '../../../modules/doctors/services/doctors.service';
import { ScheduleService } from '../../../modules/doctors/services/schedule.service';
import moment from 'moment';

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
  schedulesService = inject(ScheduleService);
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
        }));
        this.selectToday();
      });
  }

  // selectToday() {
  //   this.doctorScheduleAvailability.forEach((item, index) => {
  //     const receivedStartDate = new Date(item.availableDate);
  //     const todayDate = moment().local().startOf('day').format('YYYY-MM-DD');
  //     const availableDate = moment(receivedStartDate)
  //       .local()
  //       .startOf('day')
  //       .format('YYYY-MM-DD');
  //     if (availableDate === todayDate) {
  //       this.selectedIndex = index--;
  //       const scheduleID =
  //         this.doctorScheduleAvailability[this.selectedIndex]?.scheduleID;
  //       if (scheduleID) {
  //         this.fetchDoctorScheduleTimeAvailability(scheduleID);
  //       }
  //     }
  //   });
  // }


  selectToday() {
    this.doctorScheduleAvailability.forEach((item, index) => {
      const receivedStartDate = new Date(item.availableDate);
      const todayDate = moment().local().startOf('day').format('YYYY-MM-DD');
      const availableDate = moment(receivedStartDate)
        .local()
        .startOf('day')
        .format('YYYY-MM-DD');
      if (availableDate === todayDate) {
        this.selectedIndex = index;
        const scheduleID = this.doctorScheduleAvailability[this.selectedIndex]?.scheduleID;
        if (scheduleID) {
          this.fetchDoctorScheduleTimeAvailability(scheduleID);
        }
      }
    });
  }
  

  isInitialLoad = true;

  fetchDoctorScheduleTimeAvailability(index: any) {
    debugger;
    if (index.scheduleID) {
      const getIndex = index.scheduleID;
      this.selectedIndex = getIndex;

      // Check if it's the initial load
      if (this.isInitialLoad) {
        // Fetch data only once during the initial load
        this.schedulesService
          .doctorScheduleTimeAvailability(getIndex)
          .subscribe({
            next: (result: any) => {
              this.availableTimes = result.data.map((item: any) => ({
                ...item,
                formattedTime: item.availableTime
                  .split(':')
                  .slice(0, 2)
                  .join(':'),
              }));
            },
            error: err => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
            },
          });

        // Set flag to false after initial load
        this.isInitialLoad = false;
      } else {
        // Update the schedule with new data passed from the DOM
        this.schedulesService.doctorScheduleTimeAvailability(index).subscribe({
          next: (result: any) => {
            this.availableTimes = result.data.map((item: any) => ({
              ...item,
              formattedTime: item.availableTime
                .split(':')
                .slice(0, 2)
                .join(':'),
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
    }
  }

  // fetchDoctorScheduleTimeAvailability(index: any) {
  //   debugger;
  //   if (index.scheduleID) {
  //     const getIndex = index.scheduleID;
  //     this.selectedIndex = getIndex;
  //     this.schedulesService.doctorScheduleTimeAvailability(getIndex).subscribe({
  //       next: (result: any) => {
  //         this.availableTimes = result.data.map((item: any) => ({
  //           ...item,
  //           formattedTime: item.availableTime.split(':').slice(0, 2).join(':'),
  //         }));
  //       },
  //       error: err => {
  //         console.log(err);
  //       },
  //       complete: () => {
  //         console.log('complete');
  //       },
  //     });
  //   }
  //   this.schedulesService.doctorScheduleTimeAvailability(index).subscribe({
  //     next: (result: any) => {
  //       this.availableTimes = result.data.map((item: any) => ({
  //         ...item,
  //         formattedTime: item.availableTime.split(':').slice(0, 2).join(':'),
  //       }));
  //     },
  //     error: err => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('complete');
  //     },
  //   });
  // }

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
