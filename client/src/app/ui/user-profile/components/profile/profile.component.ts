import { Component, inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { UserInfo } from '../../../../shared/models/userInfo';
import { UserService } from '../../../../core/services/user.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends BaseComponent implements OnInit {
  matcher = new ErrorStateMatcher();
  maxDate!: Date;
  minDate!: Date;
  genders: string[] = ['Man', 'Woman', 'Custom'];
  userData!: UserInfo | null;
  cachedUserData: any;
  valueGender = '';

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    national_code: ['', [Validators.required]],
    dateOfBirth: [new Date(), [Validators.required]],
    gender: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
  });
  // phone variables
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log(this.userData);
    }

    this.pathValueForm();
  }

  pathValueForm() {
    this.firstName?.patchValue(this.userData?.firstName);
    this.lastName?.patchValue(this.userData?.lastName);
    this.national_code?.patchValue(this.userData?.national_code);
    this.gender?.patchValue(this.userData?.gender);
    this.city?.patchValue(this.userData?.city);
    this.phoneNumber?.patchValue(this.userData?.phoneNumber);
  }
  onSelectedChange(value: any) {
    this.valueGender = value.value;
  }

  onSubmit() {
    const user_id = this.userData?.user_id;

    const paylod = {
      ...this.form.value,
      user_id,
    };
    if (this.form.value) {
      debugger;
      this.userService.updateProfile(paylod).subscribe((res: any) => {
        if (res) {
          console.log('res', res);
          this.userData = res;
          this.toastrService.success('Profile updated successfully');
        }
      });
    }
  }

  trackByFn() {}

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get national_code() {
    return this.form.get('national_code');
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
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
}
