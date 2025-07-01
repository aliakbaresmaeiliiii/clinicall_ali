import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface CountriesDTO {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  http = inject(HttpClient);
  config = environment.apiEndPoint;

  getAllCountries(): Observable<CountriesDTO[]> {
    return this.http.get<CountriesDTO[]>(`${this.config}getAll-countries`);
  }
}
