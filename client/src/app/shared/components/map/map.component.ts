import { Component, OnInit } from '@angular/core';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';
import { MapService, NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { MapboxMarkers } from '../../models/mapbox-marker';
import { clearArray, clearDeepArray } from '../../utils/array-action';
import { MapboxAction } from '../../utils/mapbox-action';
import { IS_LOGIN, STATUS } from '../google-map/shared-state';
import { Status } from '../google-map/status.type';


export interface AddressInfo{
  userId?: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  id: number;
}


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgxMapboxGLModule],
  providers: [
    MapService,
    {
      provide: STATUS,
      useFactory: () => {
        return new BehaviorSubject<Status>(null);
      },
    },
    {
      provide: IS_LOGIN,
      useFactory: () => {
        return new BehaviorSubject<boolean>(false);
      },
    },
  ],

  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {

  public bounds!: LngLatBounds;
  public mapZoomAmount: any = [14];
  public centerMapLngLat: LngLatLike = [51.414965497099814, 35.74520669562432];
  public publicAddressArray!: Array<AddressInfo>;
  public publicAddressMarkers: MapboxMarkers = {
    type: 'publicAddresses',
    geometry: []
  };
  ngOnInit(): void {
    MapboxAction.startMap();
  }

  fixFloatMarkerInCenterOfMap(evt: any) {
    const lat = evt.target.transform._center.lat;
    const lng = evt.target.transform._center.lng;
  }

  public getPublicAddressArray(): void {
    clearDeepArray(this.publicAddressMarkers,'geometry');
    clearArray(this.publicAddressArray);
  }
}
