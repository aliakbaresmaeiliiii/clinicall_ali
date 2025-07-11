<<<<<<< HEAD
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
<<<<<<< HEAD
  signal
} from '@angular/core';
=======
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { PatientDTO } from '../model/patients.model';
import { PatientsService } from '../services/patients.service';
<<<<<<< HEAD
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
=======
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrl: './patient-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class PatientDetailComponent extends BaseComponent implements OnInit {
  service = inject(PatientsService);
  breakPointObserver = inject(BreakpointObserver);
  patientId!: number;
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  patientData!: PatientDTO[];
  dataSource = new MatTableDataSource<PatientDTO>();
  config = environment.urlProfileImg;
  isMobile: boolean = false;
  displayedColumns: string[] = [
<<<<<<< HEAD
    'visit_date',
=======
    'Date',
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    'Doctor',
    'Treatment',
    'Charges',
    'action',
  ];

  constructor() {
    super();
    this.activatedRoute.params.subscribe((param: any) => {
<<<<<<< HEAD
      this.patient_id.set(param);
      this.getData(param.id);
=======
      this.patientId = +param.id;
      this.getData(this.patientId);
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
    });
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.breakPointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  applyFilter(inputValue: any) {
    const query = inputValue.target.value as String;
  }
  getData(patient_id: string) {
    this.patientsService.patientDetial(patient_id).subscribe((response: any) => {
=======
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
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
      const newData = response.map((patient: any) => {
        patient.profileImage = patient.profileImage
          ? `${environment.urlProfileImg}${patient.profileImage}`
          : '../../../assets/images/bg-01.png';
        return patient;
      });
      this.dataSource = new MatTableDataSource(newData);
      this.patientData = newData;
    });
<<<<<<< HEAD
  } 
=======
  }
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4

  getProfileImageUrl(profileImage: string): string {
    return profileImage
      ? `${environment.urlProfileImg}${profileImage}`
      : '../../../assets/images/bg-01.png'; // Fallback image
  }

  editPatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
<<<<<<< HEAD
  ) {
    this.dialog.open(EditPatientDialogComponent,{
      data:row
    })
  }
=======
  ) {}
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  deletePatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {}
}
