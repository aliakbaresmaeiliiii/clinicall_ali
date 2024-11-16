import { Component, inject, OnInit, ViewChild } from '@angular/core';
import AOS from 'aos';
import { fromEvent, interval, map, pairwise, takeUntil, takeWhile } from 'rxjs';
import { CounterService } from '../shared-ui/services/counter.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.scss',
})
export class FeatureSectionComponent implements OnInit {
  counter: number = 0;
  maxCounter: number = 20;
  isLoading = false;
  imagesServices = [
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist and Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/skin.png',
      key: 2,
      specialty: 'Dermatologist and Aesthetic Specialist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/neurologist.png',

      key: 3,
      specialty: 'Neurologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/psychology.png',
      key: 4,
      specialty: 'Psychologist',
      count: 5000,
    },

    {
      src: '../../../assets/images/ui/speciality/endocrinologist.png',
      key: 6,
      specialty: 'Urologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/kids.png',
      key: 7,
      specialty: 'Endocrinologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/general.png',
      key: 8,
      specialty: 'Pediatrician',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/orthopedist.png',
      key: 9,
      specialty: 'Internist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/neurosurgeon.png',
      key: 10,
      specialty: 'Orthopedic Surgeon',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/cardiologist.png',
      key: 11,
      specialty: 'Cardiologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/dentist.png',
      key: 12,
      specialty: 'Dentist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/ent.png',
      key: 13,
      specialty: 'ENT Specialist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/speciality/eye.png',
      key: 14,
      specialty: 'Ophthalmologist',
      count: 5000,
    },
  ];

  imagesDermatology = [
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',
      key: 1,
      specialty: 'Dentistry',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 2,
      specialty: 'Dermatologist and Aesthetic Specialist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 3,
      specialty: 'Psychologist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 4,
      specialty: 'Neurologist',
      count: 5000,
    },

    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 5,
      specialty: 'Internist',
      count: 5000,
    },
    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 6,
      specialty: 'Ophthalmologist',
      count: 5000,
    },

    {
      src: '../../../assets/images/ui/imagesDermatology/service01.png',

      key: 7,
      specialty: 'Nose Surgery',
      count: 5000,
    },
  ];

  beauty = [
    {
      key: 1,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',

      price: 3000,
      off: '20%',
    },
    {
      key: 2,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',

      price: 3000,
      off: '20%',
    },
    {
      key: 3,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',

      price: 3000,
      off: '20%',
    },
    {
      key: 4,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },

    {
      key: 5,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },

    {
      key: 6,
      name: 'Dentistry',
      title: 'Botox Injection',
      description: 'Full forehead, frown lines, feet using the Masport brand',
      imgSergury: '../../../assets/images/ui/blog/blog.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      promotion: '20% Off',
      price: 3000,
      off: '20%',
    },
  ];

  dental = [
    {
      src: '../../../assets/images/ui/Dental/service02 (1).png',
      key: 1,
      specialty: 'Dental Checkup',
      count: 3500,
    },
    {
      src: '../../../assets/images/ui/Dental/service03.png',
      key: 2,
      specialty: 'Teeth Cleaning',
      count: 3200,
    },
    {
      src: '../../../assets/images/ui/Dental/service04.png',
      key: 3,
      specialty: 'Dental Fillings',
      count: 2800,
    },
    {
      src: '../../../assets/images/ui/Dental/service05.png',
      key: 4,
      specialty: 'Root Canal Treatment',
      count: 2500,
    },
    {
      src: '../../../assets/images/ui/Dental/service06.png',
      key: 5,
      specialty: 'Dental Crowns',
      count: 2300,
    },
    {
      src: '../../../assets/images/ui/Dental/service07.png',
      key: 6,
      specialty: 'Teeth Whitening',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/Dental/service08.png',
      key: 7,
      specialty: 'Dental Implants',
      count: 2000,
    },
    {
      src: '../../../assets/images/ui/Dental/service09.png',
      key: 8,
      specialty: 'Orthodontics (Braces)',
      count: 1800,
    },
    {
      src: '../../../assets/images/ui/Dental/service10.png',
      key: 9,
      specialty: 'Tooth Extraction',
      count: 2700,
    },
    {
      src: '../../../assets/images/ui/Dental/service14.png',
      key: 10,
      specialty: 'Dental Veneers',
      count: 2200,
    },
    {
      src: '../../../assets/images/ui/Dental/service14.png',
      key: 11,
      specialty: 'Dentures',
      count: 1900,
    },
    {
      src: '../../../assets/images/ui/Dental/service14.png',
      key: 12,
      specialty: 'Gum Disease Treatment',
      count: 2600,
    },
  ];

  dentalSuggestions = [
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 1,
      specialty: 'Professional Teeth Whitening',
      promotion: '20% Off',
      description: 'Achieve a brighter smile with our advanced teeth whitening services.',
      price: 150,
      discountedPrice: 120,
      off: '20%',
      drName: 'Dr. Emily White',
      address: '123 Bright Smile Ave, Dentaltown, TX',
      opinion: 'Highly recommended for a brighter smile!',
      DepositPayment: 2000,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/dental-implants.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor2.jpg',
      key: 2,
      specialty: 'Dental Implants',
      promotion: 'Save $500',
      description: 'Get a permanent solution for missing teeth with our high-quality dental implants.',
      price: 3000,
      discountedPrice: 2500,
      off: '17%',
      drName: 'Dr. John Smith',
      address: '456 Tooth Rebuild Blvd, Implant City, CA',
      opinion: 'An excellent choice for replacing missing teeth.',
      DepositPayment: 5000,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/root-canal.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor3.jpg',
      key: 3,
      specialty: 'Root Canal Treatment',
      promotion: '15% Off',
      description: 'Relieve pain and restore your tooth with our precise root canal treatment.',
      price: 500,
      discountedPrice: 425,
      off: '15%',
      drName: 'Dr. Sarah Green',
      address: '789 Root Canal Rd, Pain Relief City, FL',
      opinion: 'Efficient and pain-free root canal treatment.',
      DepositPayment: 1500,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/orthodontics.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor4.jpg',
      key: 4,
      specialty: 'Orthodontics (Braces)',
      promotion: 'Free Consultation',
      description: 'Straighten your teeth with our expert orthodontic services.',
      price: 2500,
      discountedPrice: 2500,
      off: '0%',
      drName: 'Dr. Laura Brown',
      address: '321 Aligner Ave, Braces City, NY',
      opinion: 'Perfect for achieving a straighter smile.',
      DepositPayment: 3000,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/veneers.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor5.jpg',
      key: 5,
      specialty: 'Dental Veneers',
      promotion: 'Buy 4, Get 1 Free',
      description: 'Enhance the appearance of your teeth with natural-looking veneers.',
      price: 1200,
      discountedPrice: 960,
      off: '20%',
      drName: 'Dr. Kevin Blue',
      address: '567 Veneer Valley Rd, Smile Town, IL',
      opinion: 'Amazing results for a perfect smile!',
      DepositPayment: 2500,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/dentures.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor6.jpg',
      key: 6,
      specialty: 'Dentures',
      promotion: '10% Off',
      description: 'Comfortable and durable dentures for a natural smile.',
      price: 800,
      discountedPrice: 720,
      off: '10%',
      drName: 'Dr. Martin King',
      address: '987 Comfort Rd, Denture Land, OH',
      opinion: 'Affordable and high-quality dentures.',
      DepositPayment: 1800,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/gum-treatment.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor7.jpg',
      key: 7,
      specialty: 'Gum Disease Treatment',
      promotion: 'First Checkup Free',
      description: 'Effective treatment for gum disease to restore oral health.',
      price: 300,
      discountedPrice: 300,
      off: '0%',
      drName: 'Dr. Diana Fox',
      address: '654 Healthy Gums Blvd, Smile Town, NJ',
      opinion: 'Great care for maintaining gum health.',
      DepositPayment: 1000,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/wisdom-tooth.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor8.jpg',
      key: 8,
      specialty: 'Wisdom Tooth Extraction',
      promotion: 'Save $50',
      description: 'Safe and painless wisdom tooth removal by experts.',
      price: 400,
      discountedPrice: 350,
      off: '12.5%',
      drName: 'Dr. James Grant',
      address: '987 Wisdom Way, Extraction City, CA',
      opinion: 'A stress-free and smooth procedure.',
      DepositPayment: 900,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/smile-design.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor9.jpg',
      key: 9,
      specialty: 'Smile Design',
      promotion: '30% Off',
      description: 'Transform your smile with our advanced smile design services.',
      price: 5000,
      discountedPrice: 3500,
      off: '30%',
      drName: 'Dr. Julia Lee',
      address: '321 Perfect Smile St, Design City, TX',
      opinion: 'Highly creative and transformative!',
      DepositPayment: 8000,
    },
    {
      imgSergury: 'https://cdn.example.com/images/dental/full-mouth-rehab.jpg',
      doctorImg: 'https://cdn.example.com/images/doctors/doctor10.jpg',
      key: 10,
      specialty: 'Full Mouth Rehabilitation',
      promotion: 'Custom Quote',
      description: 'Comprehensive solutions for restoring your oral health.',
      price: 10000,
      discountedPrice: 9000,
      off: '10%',
      drName: 'Dr. Walter Green',
      address: '654 Rehab Rd, Oral Health Town, FL',
      opinion: 'Complete care for a beautiful and functional smile.',
      DepositPayment: 15000,
    },
  ];
  

  shoes: any[] = [
    { value: 'boots', name: 'Boots' },
    { value: 'clogs', name: 'Clogs' },
    { value: 'loafers', name: 'Loafers' },
    { value: 'moccasins', name: 'Moccasins' },
    { value: 'sneakers', name: 'Sneakers' },
  ];

  ngOnInit() {
    this.incrementCounter();
    AOS.init({ disable: 'mobile' });
    AOS.refresh();

    var swiper = new Swiper('.serviceSwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    var swiper = new Swiper('.DermatologySwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    var swiper = new Swiper('.beautySwiper', {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
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

  showPost() {
    this.isLoading = !this.isLoading;
  }

  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }
}
