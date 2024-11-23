import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import AOS from 'aos';
import Swiper from 'swiper';

@Component({
    selector: 'app-service-section',
    templateUrl: './service-section.component.html',
    styleUrl: './service-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServiceSectionComponent implements OnInit {
  title = input<string>();
  // images = [
  //   {
  //     src: '../../../assets/images/ui/speciality/women.png',
  //     key: 1,
  //     specialty: 'Gynecologist and Obstetrician',
  //     count: 3000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/skin.png',
  //     key: 2,
  //     specialty: 'Dermatologist and Aesthetic Specialist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/neurologist.png',

  //     key: 3,
  //     specialty: 'Neurologist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/psychology.png',
  //     key: 4,
  //     specialty: 'Psychologist',
  //     count: 5000,
  //   },

  //   {
  //     src: '../../../assets/images/ui/speciality/endocrinologist.png',
  //     key: 6,
  //     specialty: 'Urologist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/kids.png',
  //     key: 7,
  //     specialty: 'Endocrinologist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/general.png',
  //     key: 8,
  //     specialty: 'Pediatrician',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/orthopedist.png',
  //     key: 9,
  //     specialty: 'Internist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/neurosurgeon.png',
  //     key: 10,
  //     specialty: 'Orthopedic Surgeon',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/cardiologist.png',
  //     key: 11,
  //     specialty: 'Cardiologist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/dentist.png',
  //     key: 12,
  //     specialty: 'Dentist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/ent.png',
  //     key: 13,
  //     specialty: 'ENT Specialist',
  //     count: 5000,
  //   },
  //   {
  //     src: '../../../assets/images/ui/speciality/eye.png',
  //     key: 14,
  //     specialty: 'Ophthalmologist',
  //     count: 5000,
  //   },
  // ];

  ngOnInit(): void {
    // var swiper = new Swiper('.serviceSwiper', {
    //   slidesPerView: 3,
    //   spaceBetween: 20,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });
    // AOS.init({ disable: 'mobile' });
    // AOS.refresh();
  }
}
