import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IClinic } from '../models/clinic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  config = environment.apiEndPoint;
  #http = inject(HttpClient);
  tokenKey!: any;

  addNewClinic(formData: any): Observable<Partial<IClinic>> {
    return this.#http.post<Partial<IClinic>>(`${this.config}clinics/add`, formData);
  }
}
