import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService {
  http = inject(HttpClient);
  config = environment.apiEndPoint;

  searchDoctors(query: string): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.config}doctors/search?query=${encodeURIComponent(query)}`
      )
      .pipe(
        map(response => response.hits.hits.map((hit: any) => hit._source)) // Map to an array of doctor objects
      );
  }
}
// searchDoctors(query: string): Observable<DoctorsDTO[]> {
//   return this.#http.get<DoctorsDTO[]>(
//     `${this.config}doctors/search?query=${query}`
//   );
// }
