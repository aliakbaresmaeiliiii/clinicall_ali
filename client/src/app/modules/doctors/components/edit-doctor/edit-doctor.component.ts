import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
<<<<<<< HEAD
  signal,
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
} from '@angular/core';
import { DoctorsDTO } from '../../models/doctors';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Validators } from '@angular/forms';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { DoctorsService } from '../../services/doctors.service';
<<<<<<< HEAD
import { CountryService } from '../../../../shared/services/countries.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
=======

@Component({
    selector: 'app-edit-doctor',
    templateUrl: './edit-doctor.component.html',
    styleUrl: './edit-doctor.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
})
export class EditDoctorComponent extends BaseComponent {
  genders: string[] = ['Male', 'Female'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
<<<<<<< HEAD
  doctorsService = inject(DoctorsService);
  countryService = inject(CountryService);
  doctorInfo: DoctorsDTO;
  matcher = new ErrorStateMatcher();
  countries = signal<any[]>([]);

  rating: number = 0;
=======
  service = inject(DoctorsService);
  doctorInfo: DoctorsDTO;
  matcher = new ErrorStateMatcher();
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

  constructor(
    public dialogRef: MatDialogRef<EditDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.doctorInfo = data;
    this.updateDoctor();
  }

  form = this.fb.group({
    id: [''],
<<<<<<< HEAD
    first_name: [
=======
    name: [
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
<<<<<<< HEAD
    last_name: [''],
    gender: [''],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    country: [''],
    address_line1: [''],
    address_line2: [''],
=======
    gender: [''],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address: [''],
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    department: [''],
    specialization: [''],
  });

<<<<<<< HEAD
  ngOnInit() {
    this.fetchCountries();
  }
  fetchCountries() {
    this.countryService.getAllCountries().subscribe((res: any) => {
      this.countries.set(res.countries);
    });
  }

  onSubmit() {
    this.doctorsService.updateDoctor(this.form.value).subscribe((res: any) => {
=======
  onSubmit() {
    this.service.updateDoctor(this.form.value).subscribe((res: any) => {
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      if (res.code === 200) {
        this.toastrService.success('the data has beed updated!');
      }
    });
  }

<<<<<<< HEAD
  onCountryChange(event: any) {
    
  }

  updateDoctor() {
    this.form.patchValue({
      id: this.doctorInfo.id,
      first_name: this.doctorInfo.first_name,
      last_name: this.doctorInfo.last_name,
=======
  updateDoctor() {
    this.form.patchValue({
      id: this.doctorInfo.id,
      name: this.doctorInfo.name,
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      gender: this.doctorInfo.gender,
      email: this.doctorInfo.email,
      age: this.doctorInfo.age,
      specialization: this.doctorInfo.specialty_name,
<<<<<<< HEAD
      address_line1: this.doctorInfo.addresses?.address_line1,
      address_line2: this.doctorInfo.addresses?.address_line2,
      country: this.doctorInfo.addresses?.country,
    });
  }
  trackByFn() {}

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get age() {
    return this.form.get('age');
  }
=======
      address: this.doctorInfo.city,
    });
  }
  trackByFn() {}
  get name() {
    return this.form.get('name');
  }

  get age() {
    return this.form.get('age');
  }

>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get mobile() {
    return this.form.get('mobile');
  }
<<<<<<< HEAD
  get address_line1() {
    return this.form.get('address_line1');
  }
  get address_line2() {
    return this.form.get('address_line2');
  }
  get country() {
    return this.form.get('country');
=======

  get address() {
    return this.form.get('address');
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  }
  get department() {
    return this.form.get('department');
  }
  get specialization() {
    return this.form.get('specialization');
  }
}
