import { Component, inject, OnInit, signal } from '@angular/core';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dental-service',
  standalone: false,
  templateUrl: './dental-service.component.html',
  styleUrl: './dental-service.component.scss',
})
export class DentalServiceComponent implements OnInit {
  doctorService = inject(DoctorsService);
  swiperDataDentistry = signal<any[]>([]);


  ngOnInit(): void {
    this.doctorService.getSubSpecialtiesById(21).subscribe((res: any) => {
      const newData = res.data.map((img: any) => {
        img.images = img.images
          ? `${environment.urlProfileImg}${img.images}`
          : '../../../assets/images/bg-01.png';
          return img
      });
      this.swiperDataDentistry.set(newData);
    });
  }
}
