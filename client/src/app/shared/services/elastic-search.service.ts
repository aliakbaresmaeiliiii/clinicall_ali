// ElasticSearch Service - Commented out for future use when Elasticsearch is purchased
/*
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService {
  http = inject(HttpClient);
  config = environment.apiEndPoint;

  searchDoctors(query: string): Observable<any[]> {
    return this.http
      .post<any>(
        `${this.config}elasticsearch/search-doctors`,
        { query: query }
      )
      .pipe(
        map(response => response.hits.hits.map((hit: any) => hit._source)) // Map to an array of doctor objects
      );
  }
}
*/
// searchDoctors(query: string): Observable<DoctorsDTO[]> {
//   return this.#http.get<DoctorsDTO[]>(
//     `${this.config}doctors/search?query=${query}`
//   );
// }
