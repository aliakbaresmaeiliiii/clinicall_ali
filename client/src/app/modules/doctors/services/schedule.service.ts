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
    doctor_id: number,
    consultation_types: string
  ): Observable<DoctorScheduleAvailability[]> {
    const params = new HttpParams().set('consultation_types', consultation_types);
    const url = `${this.config}doctors/${doctor_id}/doctor_schedules`;
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

  markAsBooked(id: number): Observable<boolean> {
    return this.#http.put<boolean>(`${this.config}doctors/${id}/booked`, {});
  }
}
