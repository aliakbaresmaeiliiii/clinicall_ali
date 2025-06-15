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
    // if (typeof localStorage !== 'undefined') {
    //   const getStoreItem = localStorage.getItem('userData');
    //   console.log(getStoreItem);

    //   debugger;
    //   if (getStoreItem) {
    //     const getItem = JSON.parse(getStoreItem);
    //     this.userData = getItem.userName;
    //   }
    // }

    this.fetchPatients();
  }

  fetchPatients() {
    this.patientService.getPatients().subscribe((res: any) => {
      console.log('👌👌👌', res);

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
