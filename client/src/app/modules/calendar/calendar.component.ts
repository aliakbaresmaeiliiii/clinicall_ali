import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
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
  private monthIndex: number = 0;
  day!: Date;
  isSelected!: boolean;
  apiData: ICalendar[] = []; //
  dateToAdd: any;

  constructor(
    private matDialog: MatDialog,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.loadApiData();
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
    this.calendar.forEach(day => {
      const eventForDay = this.apiData.find((event: ICalendar) => {
        return (
          event.date &&
          new Date(event.date).toDateString() === day.date.toDateString()
        );
      });
      if (eventForDay) {
        day.dataList.push(eventForDay);
      } else {
        day.dataList = []; // Ensure dataList is empty if no events
      }
    });
  }

  getValueOfMonth(c: any) {
    if (this.isSelected === false) {
      return;
    } else {
      const dialogRef = this.matDialog.open(DialogCalendarComponent, {
        width: '500px',
        data: { data: c },
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
          c.dataList.push(res)
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

  dragEnded(event:any) {
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

  sendEventData(data: any) {
    const eventData = {
      event_title: data.event_title,
      event_description: data.event_description,
      color: data.color,
      date: data.date,
    };
    this.calendarService.createAppointment(eventData).subscribe(res => {
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

    // this.calendarService.updateAppointment(appintmentData).subscribe(res => {
    // });
  }
}
