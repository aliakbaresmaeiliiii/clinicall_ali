import {
  Component,
  ElementRef,
  inject,
  makeStateKey,
  OnInit,
  signal,
  TransferState,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-suggustions-service',
  templateUrl: './suggustions-service.component.html',
  styleUrls: ['./suggustions-service.component.scss'],
  standalone: false,
})
export class SuggustionsServiceComponent implements OnInit {
  router = inject(Router);
  doctorService = inject(DoctorsService);
  clinicServices: any;
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('clinicData');



  ngOnInit(): void {
    this.getClinicServices();
  }

  getClinicServices() {
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);

    if (!storedData) {
      this.doctorService.getSpecialties().subscribe((res: any) => {
        this.clinicServices = res.data.map((doctor: any) => {
          doctor.img = doctor.img
            ? `${environment.urlProfileImg}${doctor.img}`
            : '../../../assets/images/bg-01.png';
          return doctor;
        });
      });
    } else {
      this.clinicServices = storedData;
    }
    return;
  }

  navigateURL(data: any) {
    debugger;
    const getData = data.name;

    switch (getData) {
      case 'Dentist':
        this.router.navigate(['speciality']);
        break;

      default:
        break;
    }
  }
}
