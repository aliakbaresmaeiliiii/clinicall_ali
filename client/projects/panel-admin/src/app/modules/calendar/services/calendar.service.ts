import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICalendar } from '../models/calendar.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  #http = inject(HttpClient);
  private config = environment.apiEndPoint;

  createAppointment(eventData: ICalendar): Observable<ICalendar> {
    return this.#http.post<ICalendar>(
      `${this.config}/insertAppointment`,
      eventData
    );
  }

  getAppointmentData(): Observable<any> {
    return this.#http.get<any>(`${this.config}/getAppointment`);
  }

  deleteAppointment(id: string): Observable<string> {
    return this.#http.delete<string>(
      `${this.config}/deleteAppointment/delete/${id}`
    );
  }

  updateAppointment(appintmentData: ICalendar): Observable<ICalendar> {
    return this.#http.put<ICalendar>(
      `${this.config}/updateAppointment/update`,
      appintmentData
    );
  }
}
