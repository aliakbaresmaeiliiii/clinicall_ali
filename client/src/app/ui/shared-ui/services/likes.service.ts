import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { likeDTO } from '../models/like';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  http = inject(HttpClient);
  private config = environment.apiEndPoint;

  addLike(formData: any): Observable<likeDTO> {
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      const token = JSON.parse(getUserData).token;

      return this.http.post<likeDTO>(
        `${this.config}doctors/${formData.doctor_id}/like`,
        {formData},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
    }else{
      return EMPTY
    }
  }
}
