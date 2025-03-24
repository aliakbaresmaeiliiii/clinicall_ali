import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  http = inject(HttpClient);
  config = environment.apiEndPoint;

  sendMessageToBot(message: string): Observable<any> {
    return this.http.post<any>(`${this.config}chat`, {message:message});
  }
}
