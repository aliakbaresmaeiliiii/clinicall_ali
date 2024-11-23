import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';

@Component({
    selector: 'app-delete-patient-dialog',
    templateUrl: './delete-patient-dialog.component.html',
    styleUrl: './delete-patient-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DeletePatientDialogComponent extends BaseComponent{
  service = inject(PatientsService);
  patientData: PatientDTO;

  constructor(
    public dialogRef: MatDialogRef<DeletePatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super()
    this.patientData = data;
  }

  deletePatient(id: number | undefined) {
    this.service.deletePatient(id).subscribe((res: any) => {
      if (res.code === 200) {
        this.toastrService.success('data has been deleted');
      }
    });
  }
}
