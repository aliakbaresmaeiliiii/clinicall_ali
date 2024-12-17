import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MapService } from '../../../shared/components/google-map/map.service';

@Component({
  selector: 'app-dialog-location-dr',
  standalone: false,
  templateUrl: './dialog-location-dr.component.html',
  styleUrl: './dialog-location-dr.component.scss',
})
export class DialogLocationDrComponent implements OnInit, AfterViewInit {
  coordinates: { lat: number; lng: number }[] = [];

  readonly dialog = inject(MatDialog);
  data = inject(MAT_DIALOG_DATA);
  cdr = inject(ChangeDetectorRef);
  mapService = inject(MapService);


  ngOnInit(): void {
    this.onAddressInput();
  }

  ngAfterViewInit(): void {
  }

  onAddressInput(): void {
    const address = this.data.address;
    debugger;
    this.mapService.geocodeAddress(address).subscribe(response => {
      if (response.features && response.features.length > 0) {
        const coordinates = response.features[0].center;
        this.coordinates = coordinates;
      }
      console.log('👉👉👉', this.coordinates);
    });
  }
}
