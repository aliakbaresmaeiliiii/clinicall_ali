import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  makeStateKey,
  OnInit,
  Renderer2,
  signal,
  TransferState,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swiper from 'swiper';
import { DoctorsService } from '../../modules/doctors/services/doctors.service';
import { environment } from '../../environments/environment';
import { DoctorsDTO } from '../../modules/doctors/models/doctors';
import { of } from 'rxjs';

@Component({
  selector: 'app-best-doctors',
  templateUrl: './best-doctors.component.html',
  styleUrl: './best-doctors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BestDoctorsComponent implements OnInit {
  renderer = inject(Renderer2);
  // socialIcon = viewChild<ElementRef>('socialIcon');
  readonly socialIcon = viewChild.required<ElementRef>('socialIcon');
  userData: any;
  toast = inject(ToastrService);
  router = inject(Router);
  doctorService = inject(DoctorsService);
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('doctorData');
  doctorData = signal<DoctorsDTO[]>([]);

  // images = [
  //   { src: '../../../assets/images/ui/doctors/team2.jpg' },
  //   { src: '../../../assets/images/ui/doctors/team3.jpg' },
  //   { src: '../../../assets/images/ui/slider/hero-img.png' },
  //   { src: '../../../assets/images/ui/doctors/team2.jpg' },
  //   { src: '../../../assets/images/ui/doctors/team3.jpg' },
  // ];

  ngOnInit(): void {
    const getUserData = localStorage.getItem('userData');
    if (getUserData) {
      this.userData = JSON.parse(getUserData);
    }
    this.fetchDefaultData()
    var swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      on: {
        slideChange: () => {
          // Add any custom logic here if needed
        },
      },
    });
  }

  fetchDefaultData() {
    this.transferState.remove(this.DATA_KEY);
    const storedData = this.transferState.get(this.DATA_KEY, null);
    if (!storedData) {
      this.doctorService.getDoctors().subscribe({
        next: (response: any) => {
          const newData = response.data.map((img: any) => {
            img.profile_img = img.profile_img
              ? `${environment.urlProfileImg}${img.profile_img}`
              : '../../../assets/images/bg-01.png';
            return img;
          });
          this.doctorData.set(newData);
          this.transferState.set(this.DATA_KEY, newData);
        },
        error: e => {
          this.toast.error(e);
          return of([]);
        },
        complete: () => {},
      });
    } else {
      this.doctorData.set(storedData);
    }
    return;
  }
  visitProfile(data: any) {
    if (!this.userData) {
      this.toast.error('Please login before make appointment...');
      this.router.navigate(['/login']);
    } else {
      let doctorName = data.first_name.replace(/\s+/g, '-');
      this.countDoctorClick(data.id);
      this.router.navigate([`/doctor/${doctorName}/${data.id}`]);
    }
  }

  countDoctorClick(id: number) {
    this.doctorService.countDoctorClick(id).subscribe(res => {});
  }

  showIcon(event: MouseEvent) {
    const socialIcon = this.socialIcon();
    if (socialIcon) {
      this.renderer.setStyle(socialIcon.nativeElement, 'opacity', '1');
    }
  }

  hideIcon(event: MouseEvent) {
    const socialIcon = this.socialIcon();
    if (socialIcon) {
      this.renderer.setStyle(socialIcon.nativeElement, 'opacity', '0');
    }
  }
}
