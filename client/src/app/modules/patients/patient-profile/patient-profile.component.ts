import { Component, inject, signal } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { PatientDTO } from '../model/patients.model';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss',
  standalone: false,
})
export class PatientProfileComponent {
  isHovered: boolean = false;
  patientDetial = signal<PatientDTO[]>([]);
  patientService = inject(PatientsService);

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients() {
    this.patientService.getPatients('').subscribe((res: any) => {
      this.patientDetial.set(res.data);
    });
  }
  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
