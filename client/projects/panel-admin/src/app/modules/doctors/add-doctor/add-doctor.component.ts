import { Component, HostListener, inject } from '@angular/core';
import { UniqueNicknameValidator } from '../../../shared/validators/unique-nickname.validators';
import { DoctorsService } from '../doctors.service';
import { AgePipe } from '../../../shared/pipes/age.pipe';
import { ErrorStateMatcher } from '@angular/material/core';
import { Validators } from '@angular/forms';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { debounceTime, switchMap } from 'rxjs';
import { DoctorsDTO } from '../models/doctors';
import { ShareService } from '../../../shared/services/share.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss',
})
export class AddDoctorComponent extends BaseComponent {
  uniqueNickname = inject(UniqueNicknameValidator);
  service = inject(DoctorsService);
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
  phoneExists: boolean | null | unknown = null;

  form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    gender: ['Man'],
    mobile: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    age: [null],
    email: ['a@gmail.com', [Validators.required, Validators.email]],
    maritalStatus: ['Single'],
    address: [''],
    specialization: [''],
    department: [''],
    degree: [''],
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
  }

  toggleDirection() {
    this.textDirection = this.textDirection === 'ltr' ? 'rtl' : 'ltr';
  }

  onSubmit() {
    if (this.profileImg) {
      const imgProfile = this.profileImg;
      const payload: DoctorsDTO = {
        name: this.form.value.name,
        gender: this.form.value.gender,
        mobile: this.form.value.mobile,
        specialization: this.form.value.specialization,
        dateOfBirth: this.form.value.dateOfBirth as String,
        address: this.form.value.address,
        department: this.form.value.department,
        degree: this.form.value.degree,
        email: this.form.value.email,
        age: this.form.value.age,
        profileImage: imgProfile.name,
      };
      this.service.addDoctor(payload).subscribe((res: any) => {
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
  get name() {
    return this.form.get('name');
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
  get specialization() {
    return this.form.get('specialization');
  }
  get department() {
    return this.form.get('department');
  }
  get degree() {
    return this.form.get('degree');
  }
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
}
