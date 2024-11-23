import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  viewChild
} from '@angular/core';
import Swiper from 'swiper';

@Component({
    selector: 'app-best-doctors',
    templateUrl: './best-doctors.component.html',
    styleUrl: './best-doctors.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BestDoctorsComponent implements OnInit {
  renderer = inject(Renderer2);
  // socialIcon = viewChild<ElementRef>('socialIcon');
  readonly socialIcon = viewChild.required<ElementRef>('socialIcon');

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
      },
      on: {
        slideChange: () => {
          // Add any custom logic here if needed
        },
      },
    });
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
