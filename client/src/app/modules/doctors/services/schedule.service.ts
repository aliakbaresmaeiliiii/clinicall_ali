import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorScheduleAvailability } from '../models/doctors';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;

  fetchDoctorScheduleAvailability(
    id: number,
    consultationType: string
  ): Observable<DoctorScheduleAvailability[]> {
    const params = new HttpParams().set('consultationType', consultationType);
    const url = `${this.config}doctors/${id}/schedule-availability`;
    return this.#http.get<DoctorScheduleAvailability[]>(url, {
      params: params,
    });
  }
  doctorScheduleTimeAvailability(
    scheduleID: number
  ): Observable<DoctorScheduleAvailability[]> {
    const url = `${this.config}/doctors/${scheduleID}/schedule-time-availability`;
    return this.#http.get<DoctorScheduleAvailability[]>(url);
  }

  markAsBooked(timeID: number): Observable<boolean> {
    return this.#http.put<boolean>(`${this.config}doctors/${timeID}/booked`, {});
  }
}
