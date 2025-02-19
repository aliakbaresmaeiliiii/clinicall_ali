import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientFavoritesService {
  http = inject(HttpClient);
  private config = environment.apiEndPoint;

  addFavoritePatient(data: any): Observable<any> {
    return this.http.post<any>(`${this.config}admin/add_favorite`, data);
  }

}
