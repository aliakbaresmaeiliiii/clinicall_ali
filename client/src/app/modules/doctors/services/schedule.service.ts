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
    consultatio_types_available: string
  ): Observable<DoctorScheduleAvailability[]> {
    const params = new HttpParams().set(
      'consultatio_types_available',
      consultatio_types_available
    );
    const url = `${this.config}doctors/${doctor_id}/doctor_schedules`;
    return this.#http.get<DoctorScheduleAvailability[]>(url, { params });
  }

  doctorScheduleTimeAvailability(
    schedule_id: number
  ): Observable<DoctorScheduleAvailability[]> {
    const url = `${this.config}/doctors/${schedule_id}/schedule-time-availability`;
    return this.#http.get<DoctorScheduleAvailability[]>(url);
  }

  markAsBooked(id: number, payload: any): Observable<boolean> {
    return this.#http.put<boolean>(`${this.config}doctors/${id}/booked`, payload);
  }
}
