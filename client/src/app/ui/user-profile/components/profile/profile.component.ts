import { Component, inject, OnInit, signal } from '@angular/core';
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
import { PatientsService } from '../../../../modules/patients/services/patients.service';

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
  patientData = signal<UserInfo[]>([]);
  cachedUserData: any;
  valueGender = '';
  patientService = inject(PatientsService)
  patientID: string = '';

  form = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    national_code: ['', [Validators.required]],
    date_of_birth: [new Date(), [Validators.required]],
    gender: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: ['', [Validators.required]],
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
      const data = JSON.parse(userDataString);
      this.patientID = data.id
    }
    this.fetchPatients();
  }


  fetchPatients() {
    this.patientService.getPatients().subscribe((res: any) => {
      this.patientData.set(res.data);
      this.pathValueForm();


    })
  }

  pathValueForm() {
    this.first_name?.patchValue(this.patientData()[0]?.first_name);
    this.last_name?.patchValue(this.patientData()[0]?.last_name);
    this.national_code?.patchValue(this.patientData()[0]?.national_code);
    this.gender?.patchValue(this.patientData()[0]?.gender);
    this.city?.patchValue(this.patientData()[0]?.city);
    this.phone?.patchValue(this.patientData()[0].phone);
  }
  onSelectedChange(value: any) {
    this.valueGender = value.value;
  }

  onSubmit() {
    const id = this.patientID;
    const paylod = {
      ...this.form.value,
      id,
    };
    if (this.form.value) {
      this.userService.updateProfile(paylod).subscribe((res: any) => {
        if (res) {
          this.signalService.setData(res);
          this.patientData = res;
          localStorage.clear();
          const dataJson = JSON.stringify(res);
          localStorage.setItem('patientData', dataJson);
          this.toastrService.success('Profile updated successfully');
        }
      });
    }
  }

  trackByFn() { }

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get national_code() {
    return this.form.get('national_code');
  }
  get date_of_birth() {
    return this.form.get('date_of_birth');
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
