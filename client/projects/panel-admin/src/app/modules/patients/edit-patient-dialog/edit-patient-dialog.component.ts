import { Component, inject, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientsService } from '../services/patients.service';
import { PatientDTO } from '../model/patients.model';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrl: './edit-patient-dialog.component.scss',
})
export class EditPatientDialogComponent extends BaseComponent {
  genders: string[] = ['Male', 'Female'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  service = inject(PatientsService);
  patientData: PatientDTO;
  matcher = new ErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<EditPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.patientData = data;
    this.updatePatient();

  }
  form = this.fb.group({
    id: [''],
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: [''],
    mobile: [''],
    dateOfBirth: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    bloodPressure: [''],
    injury: [''],
    bloodGroup: [''],
    address: [''],
  });

  onSubmit() {
    this.service.updatePatient(this.form.value).subscribe((res: any) => {
      if (res.code === 200) {
        this.toastrService.success('the data has beed updated!')
      }
    });
  }

  updatePatient() {
    this.form.patchValue({
      id: this.patientData.id,
      firstName: this.patientData.firstName,
      lastName: this.patientData.lastName,
      gender: this.patientData.gender,
      mobile: this.patientData.mobile,
      dateOfBirth: this.patientData.dateOfBirth,
      email: this.patientData.email,
      age: this.patientData.age,
      bloodPressure: this.patientData.bloodPressure,
      injury: this.patientData.injury,
      bloodGroup: this.patientData.bloodGroup,
      address: this.patientData.address,
    });
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

  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
}
