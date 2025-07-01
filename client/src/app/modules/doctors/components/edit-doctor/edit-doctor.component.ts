import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  signal,
} from '@angular/core';
import { DoctorsDTO } from '../../models/doctors';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Validators } from '@angular/forms';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { DoctorsService } from '../../services/doctors.service';
import { CountryService } from '../../../../shared/services/countries.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EditDoctorComponent extends BaseComponent {
  genders: string[] = ['Male', 'Female'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  doctorsService = inject(DoctorsService);
  countryService = inject(CountryService);
  doctorInfo: DoctorsDTO;
  matcher = new ErrorStateMatcher();
  countries = signal<any[]>([]);

  rating: number = 0;

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
    first_name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    last_name: [''],
    gender: [''],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    country: [''],
    address_line1: [''],
    address_line2: [''],
    department: [''],
    specialization: [''],
  });

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
      if (res.code === 200) {
        this.toastrService.success('the data has beed updated!');
      }
    });
  }

  onCountryChange(event: any) {
    
  }

  updateDoctor() {
    this.form.patchValue({
      id: this.doctorInfo.id,
      first_name: this.doctorInfo.first_name,
      last_name: this.doctorInfo.last_name,
      gender: this.doctorInfo.gender,
      email: this.doctorInfo.email,
      age: this.doctorInfo.age,
      specialization: this.doctorInfo.specialty_name,
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
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get mobile() {
    return this.form.get('mobile');
  }
  get address_line1() {
    return this.form.get('address_line1');
  }
  get address_line2() {
    return this.form.get('address_line2');
  }
  get country() {
    return this.form.get('country');
  }
  get department() {
    return this.form.get('department');
  }
  get specialization() {
    return this.form.get('specialization');
  }
}
