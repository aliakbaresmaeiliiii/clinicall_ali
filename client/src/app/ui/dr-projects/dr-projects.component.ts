import { Component } from '@angular/core';
import Swiper from 'swiper';
import AOS from 'aos';

@Component({
  selector: 'app-dr-projects',
  templateUrl: './dr-projects.component.html',
  styleUrl: './dr-projects.component.scss',
})
export class DrProjectsComponent {
  brands: any[] = [
    { src: '../../../assets/images/ui/brands/brand.png' },
    { src: '../../../assets/images/ui/brands/brand3.png' },
    { src: '../../../assets/images/ui/brands/brand4.png' },
    { src: '../../../assets/images/ui/brands/brand5.png' },
    { src: '../../../assets/images/ui/brands/breatcome.png' },
  ];

  data = [
    {
      title: 'Frustation',
      subtitle: 'Depression',
      body: 'mediic design for innovative solutions seamless markets network...',
      img: '../../../assets/images/ui/srvce.png',
    },
    {
      title: 'Frustation',
      subtitle: 'Depression',
      body: 'mediic design for innovative solutions seamless markets network...',
      img: '../../../assets/images/ui/srvce2.png',
    },
    {
      title: 'Frustation',
      subtitle: 'Depression',
      body: 'mediic design for innovative solutions seamless markets network...',
      img: '../../../assets/images/ui/srvce3.png',
    },
    {
      title: 'Frustation',
      subtitle: 'Depression',
      body: 'mediic design for innovative solutions seamless markets network...',
      img: '../../../assets/images/ui/srvce4.png',
    },
    {
      title: 'Frustation',
      subtitle: 'Depression',
      body: 'mediic design for innovative solutions seamless markets network...',
      img: '../../../assets/images/ui/srvce.png',
    },
    {
      title: 'Frustation',
      subtitle: 'Depression',
      body: 'mediic design for innovative solutions seamless markets network...',
      img: '../../../assets/images/ui/srvce2.png',
    },
  ];

  ngOnInit(): void {
    var swiper = new Swiper('.drProjectSwiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
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
