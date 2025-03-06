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
import { DialogService } from '../../../shared/services/dialog.service';

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
  dialogService = inject(DialogService);
  fb = inject(FormBuilder);
  doctorService = inject(DoctorsService);
  readonly data = inject<DoctorsDTO>(MAT_DIALOG_DATA);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      consultatio_types_available: [null, Validators.required], 
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.openChoosingAppointmentDialog();
    } else {
    }
  }

  openChoosingAppointmentDialog(): void {
    this.dialogService.openDialog(ChoosingAppointmentComponent, {
      doctor_id: this.data.doctor_id,
      consultatio_types_available: this.form.value.consultatio_types_available,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '300ms',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
