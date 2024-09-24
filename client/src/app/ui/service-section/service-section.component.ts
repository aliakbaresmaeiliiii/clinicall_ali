import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import AOS from 'aos';
import Swiper from 'swiper';

@Component({
  selector: 'app-service-section',

  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceSectionComponent implements OnInit {
  images = [
    { src: '../../../assets/images/ui/srvce.png' },
    { src: '../../../assets/images/ui/srvce2.png' },
    { src: '../../../assets/images/ui/srvce3.png' },
    { src: '../../../assets/images/ui/srvce4.png' },
    { src: '../../../assets/images/ui/srvce.png' },
    { src: '../../../assets/images/ui/srvce2.png' },
  ];

  ngOnInit(): void {
    var swiper = new Swiper(".serviceSwiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    AOS.init({ disable: 'mobile' });
    AOS.refresh();
  }
}
