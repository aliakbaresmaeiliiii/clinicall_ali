import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
<<<<<<< HEAD
import { CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { debounceTime, switchMap } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AgePipe } from '../../../shared/pipes/age.pipe';
import { ShareService } from '../../../shared/services/share.service';
=======
import { debounceTime, switchMap } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base/base.component';
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
import { banWords } from '../../../shared/validators/ban-words.validators';
import { UniqueNicknameValidator } from '../../../shared/validators/unique-nickname.validators';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';
<<<<<<< HEAD

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss',
  standalone: false,
})
export class AddPatientComponent extends BaseComponent implements OnInit {
  uniqueNickname = inject(UniqueNicknameValidator);
  patientsService = inject(PatientsService);
=======
import { ShareService } from '../../../shared/services/share.service';
import { AgePipe } from '../../../shared/pipes/age.pipe';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrl: './add-patient.component.scss',
    standalone: false
})
export class AddPatientComponent extends BaseComponent implements OnInit {
  uniqueNickname = inject(UniqueNicknameValidator);
  service = inject(PatientsService);
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  shareService = inject(ShareService);
  agePipe = inject(AgePipe);
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Male', 'Female'];
  maritalStatus: string[] = ['Single', 'Married'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  sugarLevels: string[] = ['Normal', 'Prediabetes', 'Diabetes'];
  title = 'Add New Patient';
  profileImg: File | null = null;
  textDirection: 'ltr' | 'rtl' = 'ltr';
  phoneExists: boolean | null = null;
  maxDate!: Date;
  minDate!: Date;
<<<<<<< HEAD
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  form = this.fb.group({
    first_name: [
=======

  form = this.fb.group({
    patientName: [
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    gender: ['Man'],
    mobile: ['', Validators.required],
<<<<<<< HEAD
    date_of_birth: ['', Validators.required],
    age: [null as any | null, { disable: true }],
=======
    dateOfBirth: ['', Validators.required],
    age: [null],
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    maritalStatus: ['Single'],
    address: [''],
    bloodGroup: [''],
<<<<<<< HEAD
    bloodPressure: [null],
    heartBeat: [null],
=======
    bloodPressure: [''],
    heartBeat: [''],
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    haemoglobin: [''],
    doctor: [''],
    treatment: [''],
    sugarLevel: [''],
    charges: [''],
    description: [''],
    injury: [''],
<<<<<<< HEAD
    password: [''],
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  });

  onTouch!: () => void;

  @HostListener('blur')
  phoneChecked() {
    this.onTouch();
  }
  ngOnInit(): void {
    this.shareService.getStoreProfileImg$.subscribe(res => {
      this.profileImg = res;
    });
    this.validationAge();
<<<<<<< HEAD

    this.date_of_birth?.valueChanges.subscribe(dob => {
      if (dob) {
        const age = this.calculateAge(new Date(dob));
        this.age?.patchValue(age);
      }
    });
    this.age?.disable();
  }

  calculateAge(dob: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  }

  validationAge() {
    this.minDate = new Date(1940, 1, 1);
    this.maxDate = new Date(2024, 11, 31);
<<<<<<< HEAD
    this.date_of_birth?.valueChanges.subscribe(date => {
=======
    this.dateOfBirth?.valueChanges.subscribe(date => {
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      if (date) {
        const age = this.agePipe.transform(date);
        if (age < 30) {
          this.toastrService.error(
            `The age ${age} is too young. Must be at least 30 years.`
          );
        } else if (age > 80) {
          this.toastrService.error(
            `The age ${age} is too old. Must be 80 years or younger.`
          );
        } else {
          // this.toastrService.success(`The age ${age} is within the allowed range.`);
        }
      }
    });
  }

  onAutofill(event: any) {
    this.mobile?.valueChanges
      .pipe(
        debounceTime(300),
<<<<<<< HEAD
        switchMap(value => this.patientsService.checkPhoneNumberExists(value))
=======
        switchMap(value => this.service.checkPhoneNumberExists(value))
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      )
      .subscribe(exist => {
        this.phoneExists = exist;
      });
    // Perform additional actions if needed
  }

  toggleDirection() {
    // Example method to toggle text direction
    this.textDirection = this.textDirection === 'ltr' ? 'rtl' : 'ltr';
  }

<<<<<<< HEAD
  sendCode(mobile:any){
    this.patientsService.sendCode(mobile).subscribe((res)=>{
      console.log(res);
    })
  }

=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  onSubmit() {
    if (this.profileImg) {
      const imgProfile = this.profileImg;
      const payload: PatientDTO = {
<<<<<<< HEAD
        first_name: this.form.value.first_name,
        gender: this.form.value.gender,
        mobile: this.form.value.mobile,
        date_of_birth: this.form.value.date_of_birth,
=======
        patientName: this.form.value.patientName,
        gender: this.form.value.gender,
        mobile: this.form.value.mobile,
        dateOfBirth: this.form.value.dateOfBirth as String,
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
        address: this.form.value.address,
        email: this.form.value.email,
        age: this.form.value.age,
        maritalStatus: this.form.value.maritalStatus,
<<<<<<< HEAD
        doctor: this.form.value.doctor,
        profile_img: imgProfile.name,
        blood_group: this.form.value.bloodGroup,
        blood_pressure: this.form.value.bloodPressure,
        heart_beat: this.form.value.heartBeat,
        sugar_level: this.form.value.sugarLevel,
        injury_condition: this.form.value.injury,
        haemoglobin: this.form.value.haemoglobin,
        treatment: this.form.value.treatment,
        charges: this.form.value.charges,
        description: this.form.value.description,
      };
      this.patientsService.addPatient(payload).subscribe((res: any) => {
=======
        bloodGroup: this.form.value.bloodGroup,
        bloodPressure: this.form.value.bloodPressure,
        heartBeat: this.form.value.heartBeat,
        haemoglobin: this.form.value.haemoglobin,
        doctor: this.form.value.doctor,
        charges: this.form.value.charges,
        sugarLevel: this.form.value.sugarLevel,
        treatment: this.form.value.treatment,
        description: this.form.value.description,
        injury: this.form.value.injury,
        profile_img: imgProfile.name,
      };
      this.service.addPatient(payload).subscribe((res: any) => {
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
        if (res.code === 200) {
          this.form.reset();
          this.toastrService.success('pateint add successfully');
        } else {
          this.toastrService.error('can not add patient...!');
        }
      });
    }
  }
  trackByFn() {}
<<<<<<< HEAD
  get first_name() {
    return this.form.get('first_name');
=======
  get patientName() {
    return this.form.get('patientName');
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  }

  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get mobile() {
    return this.form.get('mobile');
  }
  get address() {
    return this.form.get('address');
  }
  get injury() {
    return this.form.get('injury');
  }
  get bloodPressure() {
    return this.form.get('bloodPressure');
  }
  get heartBeat() {
    return this.form.get('heartBeat');
  }
  get haemoglobin() {
    return this.form.get('haemoglobin');
  }
  get doctor() {
    return this.form.get('doctor');
  }
  get treatment() {
    return this.form.get('treatment');
  }
  get charges() {
    return this.form.get('charges');
  }
  get description() {
    return this.form.get('description');
  }

<<<<<<< HEAD
  get date_of_birth() {
    return this.form.get('date_of_birth');
  }

  get clininPassword() {
    return this.form.get('password');
=======
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  }
}
