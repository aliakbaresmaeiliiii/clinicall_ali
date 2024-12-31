import { Component, inject, makeStateKey, TransferState } from '@angular/core';
import { DoctorsDTO } from '../../models/doctors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { environment } from '../../../../environments/environment';
import { DoctorsService } from '../../services/doctors.service';

@Component({
    selector: 'app-doctor-detail',
    templateUrl: './doctor-detail.component.html',
    styleUrl: './doctor-detail.component.scss',
    standalone: false
})
export class DoctorDetailComponent extends BaseComponent {
  isMobile = false;
  doctorInfo: DoctorsDTO[] = [];
  service = inject(DoctorsService);
  breakPointObserver = inject(BreakpointObserver);
  doctorId!: number;
  coordinates: { lat: number; lng: number }[] = [];
  DATA_KEY = makeStateKey<any>('doctorInfo');
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

    this.transferState.remove(this.DATA_KEY)
    const storedData = this.transferState.get(this.DATA_KEY, null);

    if (!storedData) {
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
            console.log(
              'this.DATA_KEY',
              this.transferState.get(this.DATA_KEY, null)
            );

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
          console.log('response', response);
        },

        error: e => console.error(e),
        complete: () => console.info('complete'),
      });
    } else {
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
    }
  }

  editPatient() {}

  deletePatient() {}
}
