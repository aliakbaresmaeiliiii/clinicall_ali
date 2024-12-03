import {
  Component,
  inject,
  Inject,
  makeStateKey,
  TransferState,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { PatientDTO } from '../../patients/model/patients.model';
import { PatientsService } from '../../patients/services/patients.service';

@Component({
  selector: 'app-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrl: './dialog-calendar.component.scss',
  standalone: false,
})
export class DialogCalendarComponent {
  title: string = 'Create Appointment';
  value = 'Clear me';
  date: any;
  selectedColor: any;
  form!: FormGroup;
  colors: string[] = ['#FF0000', '#00FF00', '#0000FF'];
  fb = inject(FormBuilder);
  filteredPatient: any;
  patientInfo: PatientDTO[] = [];
  transferState = inject(TransferState);
  DATA_KEY_PATIENT = makeStateKey<any>('pateintInfo');
  service = inject(PatientsService);
  selectedPatient: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date = data.data.date;
    setTimeout(() => {
      this.title = 'testing change detection';
    }, 2000);
  }

  ngOnInit(): void {
    this.fetchPatients();
    this.createForm();
    if (this.data.data) {
      this.updateForm();
    }
    if (typeof localStorage !== 'undefined') {
      const getStoreItem = localStorage.getItem('userData');
      if (getStoreItem) {
        const getItem = JSON.parse(getStoreItem);
        console.log('localstorage', getItem);
      } else {
      }
    }

    // this.form.get('color')?.valueChanges.subscribe(value => {
    //   this.selectedColor = value;
    // });
  }

  createForm() {
    this.form = this.fb.group({
      event_title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          banWords(['test', 'dummy']),
        ],
      ],
      event_description: [''],
      patientName: [''],
      color: ['#FF0000'],
    });
  }

  filterPatient() {
    const filterValue =
      this.form.get('patientInfo.patientName')?.value?.toLowerCase() || '';
    this.filteredPatient = this.patientInfo.filter(p =>
      p.patientName?.toLowerCase().includes(filterValue)
    );
  }

  fetchPatients() {
    const cachedData = this.transferState.get(this.DATA_KEY_PATIENT, null);
    if (!cachedData) {
      this.service.getPatients().subscribe((response: any) => {
        if (response && response.data) {
          this.filteredPatient = [...response.data];
          this.transferState.set(this.DATA_KEY_PATIENT, response.data);
        }
      });
    } else {
      this.patientInfo = cachedData;
      this.selectedPatient = cachedData;
      this.transferState.remove(this.DATA_KEY_PATIENT);
    }
  }

  onSelectedChange(patient: PatientDTO) {
    this.selectedPatient = patient.patient_id;
  }

  onColorChange(event: any) {
    this.selectedColor = event.value;
  }

  submit() {
    const payload = {
      patient_id: this.selectedPatient,
      doctor_id: 2,
      appointment_date: this.form.value.event_title,
      status: this.form.value.color,
      notes: this.form.value.event_description,
    };
    this.dialogRef.close(payload);
  }

  updateForm() {
    this.form.patchValue({
      event_title: this.data.data.dataList[0]?.event_title,
      event_description: this.data.data.dataList[0]?.event_description,
      color: this.data.data.dataList[0]?.color,
    });
    this.selectedColor = this.form.get('color')?.value;
  }
}
