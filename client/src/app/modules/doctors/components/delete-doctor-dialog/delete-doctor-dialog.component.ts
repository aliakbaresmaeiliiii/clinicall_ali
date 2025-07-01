import { Component, Inject, inject } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { DoctorsDTO } from '../../models/doctors';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-delete-doctor-dialog',
  standalone: false,
  templateUrl: './delete-doctor-dialog.component.html',
  styleUrl: './delete-doctor-dialog.component.scss',
})
export class DeleteDoctorDialogComponent extends BaseComponent {
  doctorsService = inject(DoctorsService);
  doctorsData!: DoctorsDTO;

  constructor(
    public dialogRef: MatDialogRef<DeleteDoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.doctorsData = data;
  }

  deletePatient() {
    const doctor_id = this.data.id;
    this.doctorsService.deleteDoctor(doctor_id).subscribe((res: any) => {
      if (res.code === 200) {
        this.toastrService.success('data has been deleted');
      }
    });
  }
}
