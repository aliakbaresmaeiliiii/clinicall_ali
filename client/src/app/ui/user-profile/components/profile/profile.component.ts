import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Validators } from 'ngx-editor';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends BaseComponent {
  matcher = new ErrorStateMatcher();
  maxDate!: Date;
  minDate!: Date;
  genders: string[] = ['Man', 'Woman', 'Custom'];

  form = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    nationalCode: ['', [Validators.required]],
    dateOfBirth: [new Date(), [Validators.required]],
    gender: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  // phone variables
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;


  onSubmit() {}

  trackByFn() {}

  get name() {
    return this.form.get('name');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get nationalCode() {
    return this.form.get('nationalCode');
  }
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
  get gender() {
    return this.form.get('gender');
  }
  get city() {
    return this.form.get('city');
  }
  get phone() {
    return this.form.get('phone');
  }
}
