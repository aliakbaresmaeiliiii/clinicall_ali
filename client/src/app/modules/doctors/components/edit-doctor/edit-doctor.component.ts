import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { DoctorsDTO } from '../../models/doctors';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Validators } from '@angular/forms';
import { banWords } from '../../../../shared/validators/ban-words.validators';
import { DoctorsService } from '../../services/doctors.service';

@Component({
    selector: 'app-edit-doctor',
    templateUrl: './edit-doctor.component.html',
    styleUrl: './edit-doctor.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditDoctorComponent extends BaseComponent {
  genders: string[] = ['Male', 'Female'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  service = inject(DoctorsService);
  doctorInfo: DoctorsDTO;
  matcher = new ErrorStateMatcher();

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
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    gender: [''],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address: [''],
    department: [''],
    specialization: [''],
  });

  onSubmit() {
    this.service.updateDoctor(this.form.value).subscribe((res: any) => {
      if (res.code === 200) {
        this.toastrService.success('the data has beed updated!');
      }
    });
  }

  updateDoctor() {
    this.form.patchValue({
      id: this.doctorInfo.id,
      name: this.doctorInfo.name,
      gender: this.doctorInfo.gender,
      email: this.doctorInfo.email,
      age: this.doctorInfo.age,
      specialization: this.doctorInfo.specialty_name,
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
  get department() {
    return this.form.get('department');
  }
  get specialization() {
    return this.form.get('specialization');
  }
}
