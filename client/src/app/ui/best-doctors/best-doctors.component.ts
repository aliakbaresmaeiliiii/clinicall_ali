import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-best-doctors',

  templateUrl: './best-doctors.component.html',
  styleUrl: './best-doctors.component.scss',

})
export class BestDoctorsComponent implements OnInit {
  renderer = inject(Renderer2);
  // socialIcon = viewChild<ElementRef>('socialIcon');
  @ViewChild('socialIcon') socialIcon!: ElementRef;

  images = [
    { src: '../../../assets/images/ui/doctors/team2.jpg' },
    { src: '../../../assets/images/ui/doctors/team3.jpg' },
    { src: '../../../assets/images/ui/slider/hero-img.png' },
    { src: '../../../assets/images/ui/doctors/team2.jpg' },
    { src: '../../../assets/images/ui/doctors/team3.jpg' },
  ];

  ngOnInit(): void {
    var swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      on: {
        slideChange: () => {
          // Add any custom logic here if needed
        },
      },
    });
  }

  showIcon(event: MouseEvent) {
    if (this.socialIcon) {
      this.renderer.setStyle(this.socialIcon.nativeElement, 'opacity', '1');
    }
  }

  hideIcon(event: MouseEvent) {
    if (this.socialIcon) {
      this.renderer.setStyle(this.socialIcon.nativeElement, 'opacity', '0');
    }
    // const socialIcon = (event.target as HTMLElement).querySelector(
    //   '.social-icon'
    // );
    // if (socialIcon) {
    //   this.renderer.setStyle(socialIcon, 'display', 'none');
    // }
  }
}
