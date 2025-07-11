import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
<<<<<<< HEAD
import { Component, HostListener, inject } from '@angular/core';
=======
import { Component, HostListener } from '@angular/core';
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
import { MatDialog } from '@angular/material/dialog';
import { CalendarDay } from './classes/calnder-day';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { ICalendar } from './models/calendar.interface';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  calendar: CalendarDay[] = [];
  dataList!: ICalendar;
  contextMenuVisible = false;
  contextMenuPosition = { x: '0px', y: '0px' };
  blinking: boolean = true;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  displayMonth!: string;
<<<<<<< HEAD
  displayDay = new Date().getDate();
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  private monthIndex: number = 0;
  day!: Date;
  isSelected!: boolean;
  apiData: ICalendar[] = []; //
  dataCalendar: ICalendar[] = []; //
  dateToAdd: any;
  private intervalId: any;
<<<<<<< HEAD

  matDialog = inject(MatDialog);
  calendarService = inject(CalendarService);
=======
  constructor(
    private matDialog: MatDialog,
    private calendarService: CalendarService
  ) {}
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.loadApiData();
    this.intervalId = setInterval(() => {
      this.blinking = !this.blinking;
    }, 2000); // Toggle every second
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    this.day = new Date(
      new Date().setMonth(new Date().getMonth() + monthIndex)
    );

    //set the display month for UI
    this.displayMonth = this.monthNames[this.day.getMonth()];
    let startingDateOfCalendar = this.getStartDateForCalendar(this.day);

    this.dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(this.dateToAdd)));
      this.dateToAdd = new Date(
        this.dateToAdd.setDate(this.dateToAdd.getDate() + 1)
      );
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    //for teh day we selected let's get the previos month las day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days until we encounter our last Monday of previous month

    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(
          startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1)
        );
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
    this.loadApiData();
  }

  decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
    this.loadApiData();
  }

  setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
    this.loadApiData();
  }

  loadApiData() {
    this.calendarService.getAppointmentData().subscribe(response => {
      this.apiData = response.data;
      this.mergeData();
    });
  }
  mergeData() {
    const normalizeDate = (date: Date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    this.apiData.forEach((appointment: ICalendar) => {
      const appointmentDate = normalizeDate(
        new Date(appointment.appointment_date)
      );

      const calendarCell = this.calendar.find(
        cell => normalizeDate(cell.date).getTime() === appointmentDate.getTime()
      );

      if (calendarCell) {
        calendarCell.dataList = calendarCell.dataList || [];
        calendarCell.dataList.push({
          event_title: appointment.event_title,
          priority: appointment.priority,
          event_description: appointment.event_description,
          appointment_time: appointment.appointment_time,
        });
      }
    });
  }

  getPriorityColor(priority: number): string {
    switch (priority) {
      case 1:
        return 'red'; // High
      case 2:
        return 'yellow'; // Medium
      case 3:
        return 'green'; // Low
      default:
        return 'gray'; // Default or unknown
    }
  }

  // mergeData() {
  //   this.calendar.forEach(day => {
  //     const eventForDay = this.apiData.find((event: ICalendar) => {
  //       return (
  //         event.date &&
  //         new Date(event.date).toDateString() === day.date.toDateString()
  //       );
  //     });
  //     if (eventForDay) {
  //       day.dataList.push(eventForDay);
  //     } else {
  //       day.dataList = []; // Ensure dataList is empty if no events
  //     }
  //   });
  // }

  getValueOfMonth(c: any) {
    if (this.isSelected === false) {
      return;
    } else {
      const dialogRef = this.matDialog.open(DialogCalendarComponent, {
        data: { data: c },
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
          c.dataList.push(res);
          const date = c.date;
          const concatData = { date, ...res };

          this.sendEventData(concatData);
        }
      });
    }
  }

  dragStarted() {
    this.isSelected = true;
  }

  dragEnded(event: any) {
    this.isSelected = false;
  }

  drop(event: CdkDragDrop<CalendarDay[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    const getData = event.container.data[0];
    this.calendar.forEach(day => {
      const eventForDay = event.container.data.find((event: any) => {
        return (
          event.date &&
          new Date(event.date).toDateString() === day.date.toDateString()
        );
      });
      // if (eventForDay) {
      //   day.dataList.push(eventForDay);
      // } else {
      //   day.dataList = []; // Ensure dataList is empty if no events
      // }
    });

    const updateData = {
      // event_id: getData.event_id,
      // event_title: getData.dataList[0].event_title,
      // event_description: getData.dataList[0].event_description,
      // color: getData.dataList[0].color,
      // date: getData.date,
    };
    this.updateAppointment(getData);
  }

  sendEventData(data: ICalendar) {
    this.calendarService.createAppointment(data).subscribe(res => {
      this.ngOnInit();
    });
  }

  // contex menu
  dataContexMenu!: any;
  onRightClick(event: any, dataList: any) {
    event.preventDefault();
    this.dataContexMenu = dataList;
    this.contextMenuPosition = {
      x: `${event.clientX}px`,
      y: `${event.clientY}px`,
    };
    this.contextMenuVisible = true;
  }
  onMenuItemClick(action: string): void {
    this.contextMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.contextMenuVisible) {
      this.contextMenuVisible = false;
    }
  }

  deleteAppointment() {
    const getEventId = this.dataContexMenu.dataList[0].event_id;
    this.calendarService.deleteAppointment(getEventId).subscribe((res: any) => {
      if (res) {
        this.ngOnInit();
      }
    });
  }

  updateAppointment(appintmentData: any) {
    this.calendarService.updateAppointment(appintmentData).subscribe(res => {});
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval to prevent memory leaks
    }
  }
}
