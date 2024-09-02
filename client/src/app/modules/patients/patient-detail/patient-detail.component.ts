import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PatientDetailComponent extends BaseComponent implements OnInit {
  service = inject(PatientsService);
  breakPointObserver = inject(BreakpointObserver);
  patientId!: number;
  patientData!: PatientDTO[];
  dataSource = new MatTableDataSource<PatientDTO>();
  config = environment.urlProfileImg;
  isMobile: boolean = false;
  displayedColumns: string[] = [
    'Date',
    'Doctor',
    'Treatment',
    'Charges',
    'action',
  ];

  constructor() {
    super();
    this.activatedRoute.params.subscribe((param: any) => {
      this.patientId = +param.id;
      this.getData(this.patientId);
    });
  }

  ngOnInit(): void {
    this.breakPointObserver.observe([Breakpoints.Handset])
    .subscribe(result=>{
      this.isMobile = result.matches
    })
  }

  getData(patientId: number) {
    // this.patientDetailSignal = toSignal(this.service.patientDetial(patientId), {
    //   initialValue: [],
    // });
    this.service.patientDetial(patientId).subscribe((response: any) => {
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
  ) {}
  deletePatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {}
}
