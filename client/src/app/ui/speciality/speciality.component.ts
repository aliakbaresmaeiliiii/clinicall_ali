import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-speciality',
  standalone: false,
  templateUrl: './speciality.component.html',
  styleUrl: './speciality.component.scss',
})
export class SpecialityComponent implements OnInit {
  discounts = [
    { key: 1, name: 'Smile Design Veneer Prices' },
    { key: 2, name: 'Removable Veneer Prices' },
    { key: 3, name: 'Permanent Veneer Prices' },
    { key: 4, name: 'Ceramic Veneer Prices' },
    { key: 5, name: 'Best Veneer Prices' },
    { key: 6, name: 'Fixed Veneer Prices' },
    { key: 7, name: 'Front Tooth Veneer Costs' },
  ];
  dentalCosts = [
    { title: 'Dental Implant Cost' },
    { title: 'Tooth Restoration Cost' },
    { title: 'Orthodontic Treatment Cost' },
    { title: 'Root Canal Treatment Cost' },
    { title: 'Scaling and Polishing Cost' },
    { title: 'Dental Veneer Cost' },
    { title: 'Teeth Whitening (Bleaching) Cost' },
    { title: 'Tooth Filling Cost' },
  ];
  bestSelling = [
    {
      id: 1,
      title: 'Mesotherapy',
      description: 'Deep cleansing and nourishing for healthy skin.',
      src: '../../../assets/images/ui/hair&skin/Mesotherapy.webp',
      count: 400,
      price: 120,
      discount: 10,
      doctorName: 'Dr. Sarah Johnson',
      doctorImage: '../../../assets/images/doctors/DrSarah.jpg',
      prodcutImage: '../../../assets/images/ui/hair&skin/Mesotherapy.webp',
      star: 4.5,
      address: '123 SkinCare Ave, Beauty City',
      briefDescription:
        'Mesotherapy revitalizes your skin by delivering essential nutrients directly to the dermis.',
    },
  ];


  readonly templateOne = viewChild.required<TemplateRef<any>>('templateOne');
  readonly templateTwo = viewChild.required<TemplateRef<any>>('templateTwo');
  readonly templateThree = viewChild.required<TemplateRef<any>>('templateThree');
  readonly templatefour = viewChild.required<TemplateRef<any>>('templatefour');

  tabs: {
    id: number;
    title: string;
    template: TemplateRef<any>;
    context?: any;
  }[] = [];

  setDataInTabs() {
    this.tabs = [
      {
        id: 0,
        title: 'Tab 1',
        template: this.templateOne(),
        context: { data: 'Data for Tab 1' },
      },
      {
        id: 1,
        title: 'Tab 2',
        template: this.templateTwo(),
        context: { data: 'Data for Tab 2' },
      },
      {
        id: 3,
        title: 'Tab 3',
        template: this.templateThree(),
        context: { data: 'Data for Tab 3' },
      },
      {
        id: 4,
        title: 'Tab 4',
        template: this.templatefour(),
        context: { data: 'Data for Tab 4' },
      },
    ];
  }
  handleTabChange(index: number) {}

  ngOnInit(): void {
    const serviceSwiper = new Swiper('.serviceSwiper', {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
    });
    // var swiper = new Swiper('.discountsSwiper', {
    //   slidesPerView: 5,
    //   spaceBetween: 20,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //       return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    //   },
    // });
    // var swiper = new Swiper('latestDentalSwiper', {
    //   slidesPerView: 5,
    //   spaceBetween: 20,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //       return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    //   },
    // });
  }
}
