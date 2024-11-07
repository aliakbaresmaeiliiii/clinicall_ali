import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  http = inject(HttpClient);
  constructor() {}
  private apiUrl = 'http://localhost:3000/transcribe';
  transcribeAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', file);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
