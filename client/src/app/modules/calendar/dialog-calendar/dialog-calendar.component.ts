import {
  Component,
  inject,
  Inject,
  makeStateKey,
  SimpleChanges,
  TransferState,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { banWords } from '../../../shared/validators/ban-words.validators';
import { PatientDTO } from '../../patients/model/patients.model';
import { PatientsService } from '../../patients/services/patients.service';
import { Colors } from '../enum/enum-color';
<<<<<<< HEAD
import { CalendarService } from '../services/calendar.service';
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

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
  colors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#F4D204', '#9C1EEA'];
  defaultColor = 'blue'; // Set your default color
  selectedColor = this.defaultColor;
  fb = inject(FormBuilder);
  filteredPatient: any;
  patientInfo: PatientDTO[] = [];
  transferState = inject(TransferState);
  DATA_KEY_PATIENT = makeStateKey<any>('pateintInfo');
  service = inject(PatientsService);
  selectedPatient: string = '';
<<<<<<< HEAD
  k = inject(CalendarService);

=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  isShowTime = false;
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  timeSlots: string[] = [];
  defaultTime: string = '';
  firstSelectedTime: string = '';
  secondSelectedTime: string = '';
<<<<<<< HEAD
  dataContextMenu: any;
  calendarService: any;
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

  constructor(
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date = data.data.date;
    this.title = 'Add Appointment';
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
      } else {
      }
    }

    this.generateTimeSlots();
    this.firstSelectedTime = this.timeSlots[0];
    this.updateSecondTime();
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
      color: [this.defaultColor],

      campaignDate: this.fb.group({
        start_date: [new Date(year, month, 1)],
        end_date: [new Date(year, month, 10)],
      }),
      campaignTime: this.fb.group({
        start_time: [null],
        end_time: [null],
      }),
    });
  }

  filterPatient() {
    const filterValue =
      this.form.get('patientInfo.patientName')?.value?.toLowerCase() || '';
    this.filteredPatient = this.patientInfo.filter(p =>
<<<<<<< HEAD
      p.first_name?.toLowerCase().includes(filterValue)
=======
      p.patientName?.toLowerCase().includes(filterValue)
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    );
  }

  fetchPatients() {
    const cachedData = this.transferState.get(this.DATA_KEY_PATIENT, null);
    if (!cachedData) {
<<<<<<< HEAD
      this.service.getPatients('').subscribe((response: any) => {
=======
      this.service.getPatients().subscribe((response: any) => {
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
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
    const priority = Object.keys(Colors).find(
      key => Colors[key as keyof typeof Colors] === selectedColorHex
    );

    const payload = {
      patient_id: this.selectedPatient,
      id: 2,
      priority: priority,
      event_description: this.form.get('event_description')?.value,
      event_title: this.form.get('event_title')?.value,
      start_date: this.form.get('campaignDate.start_date')?.value,
      end_date: this.form.get('campaignDate.end_date')?.value,
      campaignTime: this.form.get('campaignTime')?.value,
      appointmentDate: this.date,
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['campaignDateStart']) {
      this.form.value.campaignDate.controls.start_date.setValue(this.date);
    }
    if (changes['campaignDateEnd']) {
      this.form.value.campaignDate.controls.end_date.setValue(this.date);
    }
  }

  generateTimeSlots(): void {
    const interval = 15; // Interval in minutes
    const startTime = 0; // Start of the day in minutes (00:00)
    const endTime = 24 * 60; // End of the day in minutes (24:00)
    for (let minutes = startTime; minutes < endTime; minutes += interval) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const time = this.formatTime(hours, mins);
      this.timeSlots.push(time);
      this.defaultTime = time;
    }
  }

  formatTime(hours: number, minutes: number): string {
    const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  updateSecondTime(): void {
    const firstIndex = this.timeSlots.indexOf(this.firstSelectedTime);
    const secondIndex = firstIndex;
    this.secondSelectedTime =
      this.timeSlots[secondIndex] || this.timeSlots[firstIndex];
  }
<<<<<<< HEAD

  deleteAppointment() {
    const getEventId = this.dataContextMenu.dataList[0].event_id;
    this.calendarService.deleteAppointment(getEventId).subscribe((res: any) => {
      if (res) {
        this.ngOnInit();
      }
    });
  }
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
}
