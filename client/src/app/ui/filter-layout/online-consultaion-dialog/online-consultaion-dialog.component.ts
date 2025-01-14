import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ChoosingAppointmentComponent } from '../choosing-appointment/choosing-appointment.component';
import { DoctorsDTO } from '../../../modules/doctors/models/doctors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DoctorsService } from '../../../modules/doctors/services/doctors.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-online-consultaion-dialog',
  standalone: false,
  templateUrl: './online-consultaion-dialog.component.html',
  styleUrl: './online-consultaion-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlineConsultaionDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<OnlineConsultaionDialogComponent>);
  dialog = inject(MatDialog);
  fb = inject(FormBuilder);
  doctorService = inject(DoctorsService);
  readonly data = inject<DoctorsDTO>(MAT_DIALOG_DATA);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      consultationType: [null, Validators.required], // Radio button value
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(
        'Selected Consultation Type:',
        this.form.value.consultationType
      );
      this.continue();
    } else {
      console.log('Form is invalid');
    }
  }

  continue(): void {
    this.dialog.open(ChoosingAppointmentComponent, {
      width: '700px',
      data: {
        doctor_id: this.data,
        consultationType: this.form.value.consultationType,
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
