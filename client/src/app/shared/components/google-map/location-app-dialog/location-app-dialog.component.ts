import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GoogleMapComponent } from '../google-map.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-location-app-dialog',
  standalone: false,
  templateUrl: './location-app-dialog.component.html',
  styleUrl: './location-app-dialog.component.scss',
})
export class LocationAppDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LocationAppDialogComponent>);
  readonly data = inject<GoogleMapComponent>(MAT_DIALOG_DATA);
  http = inject(HttpClient);
  // readonly animal:any = model(this.data.marker);

  onNoClick(): void {
    this.dialogRef.close();
  }

  openInWaze(): void {
    const address = 'Subang Jaya Medical Centre, Subang Jaya, Malaysia';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=YOUR_API_KEY`;

    this.http.get(geocodeUrl).subscribe((response: any) => {
      if (response.results && response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;
        const wazeUrl = `waze://?ll=${lat},${lng}&navigate=yes`;
        window.open(wazeUrl, '_system');
      } else {
        alert('Unable to find location');
      }
    });
  }
  opneGoogleMaps() {}
  opneInMaps() {}
}
