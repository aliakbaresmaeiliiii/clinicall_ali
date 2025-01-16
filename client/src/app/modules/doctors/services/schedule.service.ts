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
    consultationType: string
  ): Observable<DoctorScheduleAvailability[]> {
    const params = new HttpParams().set('consultationType', consultationType);
    const url = `${this.config}doctors/${doctor_id}/schedule-availability`;
    return this.#http.get<DoctorScheduleAvailability[]>(url, {
      params: params,
    });
  }
  doctorScheduleTimeAvailability(
    scheduleID: number
  ): Observable<DoctorScheduleAvailability[]> {
    debugger;
    const url = `${this.config}/doctors/${scheduleID}/schedule-time-availability`;
    return this.#http.get<DoctorScheduleAvailability[]>(url);
  }
}
