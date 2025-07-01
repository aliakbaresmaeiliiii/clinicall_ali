import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class PatientDetailComponent extends BaseComponent implements OnInit {
  patientsService = inject(PatientsService);
  breakPointObserver = inject(BreakpointObserver);
  patient_id = signal<Object>({});
  patientData!: PatientDTO[];
  dataSource = new MatTableDataSource<PatientDTO>();
  config = environment.urlProfileImg;
  isMobile: boolean = false;
  displayedColumns: string[] = [
    'visit_date',
    'Doctor',
    'Treatment',
    'Charges',
    'action',
  ];

  constructor() {
    super();
    this.activatedRoute.params.subscribe((param: any) => {
      this.patient_id.set(param);
      this.getData(param.id);
    });
  }

  ngOnInit(): void {
    this.breakPointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  applyFilter(inputValue: any) {
    const query = inputValue.target.value as String;
  }
  getData(patient_id: string) {
    this.patientsService.patientDetial(patient_id).subscribe((response: any) => {
      const newData = response.map((patient: any) => {
        patient.profileImage = patient.profileImage
          ? `${environment.urlProfileImg}${patient.profileImage}`
          : '../../../assets/images/bg-01.png';
        return patient;
      });
      this.dataSource = new MatTableDataSource(newData);
      this.patientData = newData;
    });
  } 

  getProfileImageUrl(profileImage: string): string {
    return profileImage
      ? `${environment.urlProfileImg}${profileImage}`
      : '../../../assets/images/bg-01.png'; // Fallback image
  }

  editPatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog.open(EditPatientDialogComponent,{
      data:row
    })
  }
  deletePatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {}
}
