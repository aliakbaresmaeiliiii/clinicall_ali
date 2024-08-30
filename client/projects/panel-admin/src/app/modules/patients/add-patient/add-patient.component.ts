import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { debounceTime, switchMap } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { UniqueNicknameValidator } from '../../../shared/validators/unique-nickname.validators';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';
import { ShareService } from '../../../shared/services/share.service';
import { AgePipe } from '../../../shared/pipes/age.pipe';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss',
})
export class AddPatientComponent extends BaseComponent implements OnInit {
  uniqueNickname = inject(UniqueNicknameValidator);
  service = inject(PatientsService);
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

  form = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['Man'],
    mobile: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    age: [null],
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    maritalStatus: ['Single'],
    address: [''],
    bloodGroup: [''],
    bloodPressure: [''],
    heartBeat: [''],
    haemoglobin: [''],
    doctor: [''],
    treatment: [''],
    sugarLevel: [''],
    charges: [''],
    description: [''],
    injury: [''],
  });

  onTouch!: () => void;

  @HostListener('blur')
  phoneChecked() {
    this.onTouch();
  }
  ngOnInit(): void {
    this.shareService.getStoreProfileImg$.subscribe(res => {
      this.profileImg = res;
      console.log(this.profileImg);

    });
    this.dateOfBirth?.valueChanges.subscribe(date => {
      if (date) {
        const age = this.agePipe.transform(date);
        this.form.get('age')?.setValue(age, { emitEvent: false });
      }
    });
  }

  onAutofill(event: any) {
    console.log('Autofilled:', event.isAutofilled);
    this.mobile?.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.service.checkPhoneNumberExists(value))
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

  onSubmit() {
    if (this.profileImg) {
      const imgProfile = this.profileImg;
      const payload: PatientDTO = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        mobile: this.form.value.mobile,
        dateOfBirth: this.form.value.dateOfBirth as String,
        address: this.form.value.address,
        email: this.form.value.email,
        age: this.form.value.age,
        maritalStatus: this.form.value.maritalStatus,
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
        profileImage: imgProfile.name,
      };
      this.service.addPatient(payload).subscribe((res: any) => {
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
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
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

  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
}
