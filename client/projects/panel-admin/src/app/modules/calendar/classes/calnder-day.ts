import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'calendar-day',
  template: '',
  styles: [],
  providers: [],
})
export class CalendarDay {
  public date: Date;
  public title!: string;
  public isPastDate: boolean;
  public isToday: boolean;
  dataList: any[] = [];

 
  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }

  public getDateString() {
    return this.date.toISOString().split('T')[0];
  }

}
