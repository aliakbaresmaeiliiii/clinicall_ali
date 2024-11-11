import { Component, inject, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';

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
    patientName: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
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
      id: this.patientData.patient_id,
      patientName: this.patientData.patientName,
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
  get patientName() {
    return this.form.get('patientName');
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
