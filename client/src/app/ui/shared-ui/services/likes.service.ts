import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { likeDTO } from '../models/like';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  http = inject(HttpClient);
  private config = environment.apiEndPoint;

  addLike(likeInfo: likeDTO): Observable<likeDTO> {
    return this.http.post<likeDTO>(
      `${this.config}admin/toggleLike`,
      likeInfo
    );
  }
}
