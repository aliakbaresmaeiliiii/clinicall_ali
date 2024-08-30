import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import * as mapboxGl from 'mapbox-gl';
import { LngLat } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { MapService } from './map.service';



@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss',
})
export class GoogleMapComponent implements OnInit {
  @Input() coordinates: { lat: number; lng: number }[] = [];
  @Input() zoomLevel: number = 14;
  @Output() markerMoved = new EventEmitter<any>();

  style = 'mapbox://styles/mapbox/streets-v11';
  lng: number = 51.375447552429875;
  lat: number = 35.744711325653654;

  map!: mapboxgl.Map;
  markerData!: LngLat;
  marker: mapboxGl.Marker = new mapboxGl.Marker();
  private platformId: Object = inject(PLATFORM_ID);
  service = inject(MapService);
  cdr = inject(ChangeDetectorRef);

  constructor() {
    this.initializeMap(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinates'].currentValue && this.coordinates) {
      this.updateMapLocation(this.coordinates);
    }
  }
  ngOnInit(): void {
    this.setCurrentLocation();
  }

  initializeMap(zoom: number | null = null): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout((): void => {
        this.map = new mapboxGl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          zoom: zoom ? zoom : 14,
          attributionControl: true,
          accessToken: environment.mapboxToken,
          center: this.coordinates.length
            ? [this.coordinates[0].lng, this.coordinates[0].lat]
            : [-74.006, 40.7128],

          maxZoom: 20,
        });
        // this.map.on('load', (): void => {
        //   // this.addEssentialMapControls();
        // });

        if (
          (this.coordinates[0],
          this.coordinates[0].lng,
          this.coordinates[0].lat)
        ) {
          const lngLat: LngLat = {
            lng: parseFloat(`${this.coordinates[0].lng}`),
            lat: parseFloat(`${this.coordinates[0].lat}`),
          } as LngLat;
          this.marker = new mapboxGl.Marker({
            draggable: true,
            anchor: 'center',
          })
            .setLngLat(lngLat)
            .addTo(this.map);
        }

        // Use the 'move' event to keep the marker centered
        this.marker.on('dragend', (): void => {
          this.cdr.detectChanges();
          const updatedCoordinates: LngLat = this.marker.getLngLat();
          this.getAddressFromCoordinates(
            updatedCoordinates.lng,
            updatedCoordinates.lat
          );

          // Re-center the map on the marker's new position
          this.map.flyTo({
            center: updatedCoordinates,
            zoom: this.map.getZoom(),
            speed: 1.5,
          });
        });

        this.map.on('click', (event: mapboxGl.MapMouseEvent): void => {
          this.marker.remove();
          const updatedCoordinates: LngLat = this.marker.getLngLat();
          this.getAddressFromCoordinates(
            updatedCoordinates.lng,
            updatedCoordinates.lat
          );
          this.marker = new mapboxGl.Marker({ draggable: true })
            .setLngLat(event.lngLat)
            .addTo(this.map);
        });
      });
    }
  }

  updateMapLocation(coordinates: [number, number] | any): void {
    const [lng, lat] = coordinates; // Destructure the array into lng and lat
    this.map?.flyTo({ center: [lng, lat], zoom: 6 });
    this.marker?.setLngLat({ lng, lat });
  }

  getAddressFromCoordinates(lng: number, lat: number): void {
    this.service.reverseGeocode(lng, lat).subscribe(
      response => {
        const address = response.features[0]?.place_name || 'Unknown location';
        const location: any = { lat, lng, address };
        this.markerMoved.emit(location);
        console.log('Address:', address);
      },
      error => {
        console.log('Reverse geocoding error:', error);
      }
    );
  }

  setCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lng = position.coords.longitude;
          const lat = position.coords.latitude;

          // Center the map on the user's current location
          this.map.flyTo({
            center: [lng, lat],
            zoom: 14,
          });

          // Place a marker at the user's current location
          this.marker.setLngLat([lng, lat]).addTo(this.map);
        },
        error => {
          console.error('Error getting location:', error);
          alert(
            'Unable to retrieve your location. Please check your browser settings.'
          );
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  validateCoordinates(lng: number, lat: number): boolean {
    return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
  }
}
