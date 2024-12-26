import { Component, inject, OnInit } from '@angular/core';
import { DoctorsService } from '../../../../modules/doctors/doctors.service';

@Component({
  selector: 'app-feedback',
  standalone: false,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent implements OnInit {
  userData: any;
  doctorService = inject(DoctorsService);

  urlIcon = {
    empty: '../../../../../assets/images/ui/svg/star-empty.svg',
    half: '../../../../../assets/images/ui/svg/star-half.svg',
    full: '../../../../../assets/images/ui/svg/star-full.svg',
  };


  ngOnInit(): void {
     this.userData = this.doctorService.doctorInfo
     
    
  }


}
