import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';
import moment from 'moment';
import { environment } from '../../../environments/environment';
import { BloodGroupEnum } from '../enum/patient.enum';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrl: './edit-patient-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EditPatientDialogComponent
  extends BaseComponent
  implements OnInit
{
  genders = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
  ];
  bloodGroups = [
    { id: 1, value: 'A+' },
    { id: 2, value: 'A-' },
    { id: 3, value: 'B+' },
    { id: 4, value: 'B-' },
    { id: 5, value: 'AB+' },
    { id: 6, value: 'AB-' },
    { id: 7, value: 'O+' },
    { id: 8, value: 'O-' },
  ];
  patientsService = inject(PatientsService);
  patientData: PatientDTO;
  matcher = new ErrorStateMatcher();
  defaultValueBloodGroup = 'ali';

  constructor(
    public dialogRef: MatDialogRef<EditPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.patientData = data;
    this.updatePatient();
  }
  form = this.fb.group({
    patient_id: [''],
    first_name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    last_name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        banWords(['test', 'dummy']),
      ],
    ],
    gender: [''],
    mobile: [''],
    date_of_birth: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    blood_pressure: [''],
    injury_condition: [''],
    blood_group: ['unknown'],
    address: [''],
  });

  ngOnInit(): void {
    const patient_id = this.data.patient_id;
    this.getData(patient_id);
    // this.defaultValueBloodGroup = +this.data.blood_group;
  }

  getData(patient_id: string) {
    this.patientsService
      .patientDetial(patient_id)
      .subscribe((response: any) => {
        const newData = response.map((patient: any) => {
          patient.profileImage = patient.profileImage
            ? `${environment.urlProfileImg}${patient.profileImage}`
            : '../../../assets/images/bg-01.png';
          return patient;
        });
        this.patientData = newData;
        this.form.patchValue({
          patient_id: this.data.patient_id,
          first_name: this.data.first_name,
          last_name: this.data.last_name,
          gender: this.data.gender,
          mobile: this.data.mobile,
          date_of_birth: moment(this.data.date_of_birth, 'YYYY-MM-DD').format(
            'YYYY-MM-DD'
          ),

          email: this.data.email,
          age: this.data.age,
          blood_pressure: this.data.blood_pressure,
          injury_condition: this.data.injury_condition,
          blood_group: this.data.blood_group,
          address: this.data.address,
        });
      });
  }

  onSelectionChageBlood() {
    this.bloodGroups = this.data.blood_group;
  }
  onSubmit() {
    this.patientsService
      .updatePatient(this.form.value)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.toastrService.success('the data has beed updated!');
        }
      });
  }

  updatePatient() {}
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

  get address() {
    return this.form.get('address');
  }

  get injury_condition() {
    return this.form.get('injury_condition');
  }
  get blood_group() {
    return this.form.get('blood_group');
  }
  get bloodPressure() {
    return this.form.get('blood_pressure');
  }

  get date_of_birth() {
    return this.form.get('date_of_birth');
  }
}
