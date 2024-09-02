import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  http = inject(HttpClient);
  private config = environment.apiEndPoint;


  changeUserPasswrod(data: any): Observable<any> {
    return this.http.post<any>(`${this.config}user/change-password`, data);
  }
}
