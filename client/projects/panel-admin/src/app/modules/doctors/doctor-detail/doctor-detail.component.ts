import { Component, inject, makeStateKey, TransferState } from '@angular/core';
import { DoctorsDTO } from '../models/doctors';
import { DoctorsService } from '../doctors.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.scss',
})
export class DoctorDetailComponent extends BaseComponent {
  isMobile = false;
  doctorInfo: DoctorsDTO[] = [];
  service = inject(DoctorsService);
  breakPointObserver = inject(BreakpointObserver);
  doctorId!: number;
  coordinates: { lat: number; lng: number }[] = [];
  DATA_KEY = makeStateKey<any>('dataKey');
  transferState = inject(TransferState);

  constructor() {
    super();
    this.activatedRoute.params.subscribe((param: any) => {
      this.doctorId = +param.id;
      this.fetchData(this.doctorId);
    });
  }

  ngOnInit(): void {
    this.breakPointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  fetchData(doctorId: number) {
    const storedData = this.transferState.get(this.DATA_KEY, null);
    if (storedData) {
      this.doctorInfo = storedData;
      this.coordinates = this.doctorInfo
      .filter(item => item.location)
      .map((loc: any) => {
        console.log('📌', loc.location);
        return {
          lng: loc.location.x,
          lat: loc.location.y,
        };
      });
      return;
    } else {
      this.service.doctorDetial(doctorId).subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            const newData = response.map((patient: any) => {
              patient.profileImage = patient.profileImage
                ? `${environment.urlProfileImg}${patient.profileImage}`
                : '../../../assets/images/bg-01.png';
              return patient;
            });
            this.doctorInfo = newData;
            this.transferState.set(this.DATA_KEY, this.doctorInfo);
            this.coordinates = this.doctorInfo
              .filter(item => item.location)
              .map((loc: any) => {
                console.log('📌', loc.location);
                return {
                  lng: loc.location.x,
                  lat: loc.location.y,
                };
              });
          }
          console.log('response',response);
          
        },

        error: e => console.error(e),
        complete: () => console.info('complete'),
      });
    }
  }

  editPatient() {}

  deletePatient() {}
}
