import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-dental-service',
  standalone: false,
  templateUrl: './dental-service.component.html',
  styleUrl: './dental-service.component.scss',
})
export class DentalServiceComponent implements AfterViewInit {
  dentalSuggestions = [
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/1.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 1,
      specialty: 'Professional Teeth Whitening',
      promotion: '20% Off',
      description:
        'Achieve a brighter smile with our advanced teeth whitening services.',
      price: 150,
      discountedPrice: 120,
      off: '20%',
      drName: 'Dr. Emily White',
      address: '123 Bright Smile Ave, Dentaltown, TX',
      opinion: 'Highly recommended for a brighter smile!',
      DepositPayment: 2000,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 2,
      specialty: 'Dental Implants',
      promotion: 'Save $500',
      description:
        'Get a permanent solution for missing teeth with our high-quality dental implants.',
      price: 3000,
      discountedPrice: 2500,
      off: '17%',
      drName: 'Dr. John Smith',
      address: '456 Tooth Rebuild Blvd, Implant City, CA',
      opinion: 'An excellent choice for replacing missing teeth.',
      DepositPayment: 5000,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 3,
      specialty: 'Root Canal Treatment',
      promotion: '15% Off',
      description:
        'Relieve pain and restore your tooth with our precise root canal treatment.',
      price: 500,
      discountedPrice: 425,
      off: '15%',
      drName: 'Dr. Sarah Green',
      address: '789 Root Canal Rd, Pain Relief City, FL',
      opinion: 'Efficient and pain-free root canal treatment.',
      DepositPayment: 1500,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 4,
      specialty: 'Orthodontics (Braces)',
      promotion: 'Free Consultation',
      description:
        'Straighten your teeth with our expert orthodontic services.',
      price: 2500,
      discountedPrice: 2500,
      off: '0%',
      drName: 'Dr. Laura Brown',
      address: '321 Aligner Ave, Braces City, NY',
      opinion: 'Perfect for achieving a straighter smile.',
      DepositPayment: 3000,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 5,
      specialty: 'Dental Veneers',
      promotion: 'Buy 4, Get 1 Free',
      description:
        'Enhance the appearance of your teeth with natural-looking veneers.',
      price: 1200,
      discountedPrice: 960,
      off: '20%',
      drName: 'Dr. Kevin Blue',
      address: '567 Veneer Valley Rd, Smile Town, IL',
      opinion: 'Amazing results for a perfect smile!',
      DepositPayment: 2500,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
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
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 7,
      specialty: 'Gum Disease Treatment',
      promotion: ' Free',
      description:
        'Effective treatment for gum disease to restore oral health.',
      price: 300,
      discountedPrice: 300,
      off: '0%',
      drName: 'Dr. Diana Fox',
      address: '654 Healthy Gums Blvd, Smile Town, NJ',
      opinion: 'Great care for maintaining gum health.',
      DepositPayment: 1000,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
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
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      key: 9,
      specialty: 'Smile Design',
      promotion: '30% Off',
      description:
        'Transform your smile with our advanced smile design services.',
      price: 5000,
      discountedPrice: 3500,
      off: '30%',
      drName: 'Dr. Julia Lee',
      address: '321 Perfect Smile St, Design City, TX',
      opinion: 'Highly creative and transformative!',
      DepositPayment: 8000,
    },
    {
      imgSergury: '../../../assets/images/ui/Dental/download.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
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


  ngAfterViewInit(): void {
    this.initializeSkinSwiper();
  }

  initializeSkinSwiper(): void {
    new Swiper('.dentalSwiper', {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
