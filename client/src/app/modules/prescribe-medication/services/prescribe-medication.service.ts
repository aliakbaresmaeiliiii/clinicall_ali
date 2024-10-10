import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrescribeMedicationService {
  http = inject(HttpClient);
  config = environment.apiEndPoint;

  // getMedic(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getDrugData(): Observable<any> {
    return this.http.get(`${this.config}medicine`);
  }
}
