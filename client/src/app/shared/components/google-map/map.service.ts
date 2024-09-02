import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LngLat } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { MapFeatureModel } from './map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  getMapboxPlace(coordinates: LngLat): Observable<any> {
    return this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${environment.mapboxToken}`
    );
  }

  getPlace(search: string): Observable<MapFeatureModel> {
    return this.http.get<MapFeatureModel>(`
      https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        search
      )}.json?access_token=${environment.mapboxToken}&limit=20
    `);
  }

  geocodeAddress(address: string): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(address)}.json?access_token=${environment.mapboxToken}`;
    return this.http.get(url);
  }

  reverseGeocode(lng: number, lat: number): Observable<any> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${environment.mapboxToken}`;
    return this.http.get(url);
  }
}
