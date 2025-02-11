import {
  AfterViewInit,
  Component,
  inject,
  makeStateKey,
  OnInit,
  signal,
  TransferState
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';

@Component({
  selector: 'app-suggustions-service',
  templateUrl: './suggustions-service.component.html',
  styleUrls: ['./suggustions-service.component.scss'],
  standalone: false,
})
export class SuggustionsServiceComponent implements OnInit,AfterViewInit {
  router = inject(Router);
  doctorService = inject(DoctorsService);
  clinicServices = signal<any[]>([]);
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('clinicData');

  ngOnInit(): void {
    this.getClinicServices()
    
  }
  ngAfterViewInit(): void {
  }
  
  getClinicServices() {
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);
    if (!storedData) {
      this.doctorService.getSpecialties().subscribe((res: any) => {
        const newData = res.data.map((img: any) => {
          img.images = img.images
            ? `${environment.urlProfileImg}${img.images}`
            : '../../../assets/images/bg-01.png';
          return img;
        });
        this.clinicServices.set(newData);
      });
    } else {
      this.clinicServices = storedData;
    }
  }

  navigateURL(data: any) {
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
