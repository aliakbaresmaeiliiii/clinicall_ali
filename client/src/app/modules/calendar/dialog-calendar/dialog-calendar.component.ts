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
import { Colors } from '../enum/enum-color';

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
  form!: FormGroup;
  colors: string[] = ['red', 'green', 'blue', 'yellow', 'purple'];
  defaultColor = 'blue'; // Set your default color
  selectedColor = this.defaultColor;
  fb = inject(FormBuilder);
  filteredPatient: any;
  patientInfo: PatientDTO[] = [];
  transferState = inject(TransferState);
  DATA_KEY_PATIENT = makeStateKey<any>('pateintInfo');
  service = inject(PatientsService);
  selectedPatient: string = '';
  isShowTime = false;
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

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
    this.selectedColor = this.defaultColor;
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
      color: [this.defaultColor] 
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
    const selectedColorHex = this.form.get('color')?.value;
    const sttus = Object.keys(Colors).find(
      key => Colors[key as keyof typeof Colors] === selectedColorHex
    );
    const payload = {
      patient_id: this.selectedPatient,
      doctor_id: 2,
      priority: sttus,
      event_description: this.form.get('event_description')?.value,
      event_title: this.form.get('event_title')?.value,
    };
    this.dialogRef.close(payload);
    debugger;
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
