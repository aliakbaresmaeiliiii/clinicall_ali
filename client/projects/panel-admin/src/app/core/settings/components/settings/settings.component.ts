import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MapService } from '../../../../shared/components/google-map/map.service';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { UniqueNicknameValidator } from '../../../../shared/validators/unique-nickname.validators';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Man', 'Woman', 'Custom'];
  skills$!: Observable<string[]>;
  coordinates: { lat: number; lng: number }[];
  mapService = inject(MapService);
  mapCoordinates = [{ lat: 3.022130075276455, lng: 101.57977844022147 }];
  zoomlevel!: number;
  hasAccess = false;
  permissionService = inject(PermissionService);
  country: string[] = [
    'Spanish',
    'UK',
    'Malaysia',
    'Iran',
    'Netherland',
    'Autria',
    'England',
  ];

  form = this.fb.group({
    firstName: [
      'Aliakbar',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['Esmaeili', [Validators.required, Validators.minLength(2)]],
    nickname: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWords(['dummy', 'anonymous']),
        ],
        asyncValidators: [
          this.uniqueNickname.validate.bind(this.uniqueNickname),
        ],
        updateOn: 'blur',
      },
    ],
    gender: 'Man',
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    phoneNumber: [''],
    address: [''],
    country: [''],
    city: [''],
    state: [''],
    zipcode: [''],
    skills: [''],
  });

  lng: number = 51.375447552429875;
  lat: number = 35.744711325653654;

  constructor(
    private uniqueNickname: UniqueNicknameValidator,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.coordinates = [{ lng: this.lng, lat: this.lat }];
  }

  ngOnInit() {
    this.getuserSkills();
  
  }

  onSubmit() {
    if (this.form.value) {
      this.userService.updateProfile(this.form.value).subscribe(res => {});
    }
  }

  trackByFn() {}

  getuserSkills() {
    // this.skills$ = this.userService.getSkills();
  }

  onAddressInput(): void {
    const address = this.address?.value;
    if (!address) {
      this.mapCoordinates = this.mapCoordinates;
    } else {
      this.mapService.geocodeAddress(address).subscribe(
        response => {
          if (response.features && response.features.length > 0) {
            const coordinates = response.features[0].center;
            this.mapCoordinates = coordinates;
          }
          console.log('👉👉👉', this.mapCoordinates);
        },
        error => {
          console.log('Geocoding error:', error);
        }
      );
    }
  }

  onCountryChange(event: any) {
    if (!event) {
      this.mapCoordinates = this.mapCoordinates;
    } else {
      this.mapService.geocodeAddress(event).subscribe(
        response => {
          if (response.features && response.features.length > 0) {
            const coordinates = response.features[0].center;
            this.mapCoordinates = coordinates;
            this.zoomlevel = 6;
            this.cdr.detectChanges();
          }
          console.log('👉👉👉', this.mapCoordinates);
        },
        error => {
          console.log('Geocoding error:', error);
        }
      );
    }
  }

  onMarkerMoved(event: any): void {
    console.log('Marker moved to:', event);
    console.log('Address:', event.address);
    const getCountry = this.extractCounty(event.address);
    const city = this.extractState(event.address);
    const zipcode = this.extractPostalCode(event.address);
    const state = this.extractState(event.address);
    this.address?.patchValue(event.address);
    this.city?.patchValue(city);
    this.zipcode?.patchValue(zipcode);
    this.state?.patchValue(state);
  }

  extractCounty(address: string): string {
    const parts = address.split(',').map(part => part.trim());
    return parts.length > 0 ? parts[parts.length - 1] : '';
  }
  extractCity(address: string): string {
    const parts = address.split(',').map(part => part.trim());
    return parts.length > 0 ? parts[parts.length - 2] : '';
  }

  extractPostalCode(address: string): string | null {
    const postalCodeMatch = address.match(/\b\d{5}\b/);
    return postalCodeMatch ? postalCodeMatch[0] : null;
  }

  extractState(address: string): string | null {
    const parts = address.split(',').map(part => part.trim());
    return parts[parts.length - 3] || '';
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get nickname() {
    return this.form.get('nickname');
  }
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get zipcode() {
    return this.form.get('zipcode');
  }
  // get skills() {
  //   return this.form.controls.ski.get('skills');
  // }

  ngOnDestroy(): void {}
}
