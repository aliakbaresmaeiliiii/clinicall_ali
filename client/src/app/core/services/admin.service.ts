import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AdminDTO } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;

  getAdmin(): Observable<AdminDTO[]> {
    return this.#http.get<AdminDTO[]>(`${this.config}getUserAdmin`);
  }
}
