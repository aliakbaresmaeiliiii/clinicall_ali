import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { interval, takeWhile } from 'rxjs';
import Swiper from 'swiper';
import { AmazonService } from '../shared-ui/services/amazon.service';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.scss',
  standalone: false,
})
export class FeatureSectionComponent implements OnInit, AfterViewInit {
  counter: number = 0;
  maxCounter: number = 20;
  isLoading = false;
  router = inject(Router);
  awsService = inject(AmazonService);
  exchangeRate = 42000;

  fileUrls: string[] = [];
  imageUrl: any;

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

  rhinoplastyTips = [
    {
      title: 'Open Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Advanced Cosmetic Surgery Clinic',
      address: '12 Jalan Bukit Bintang, Kuala Lumpur, Malaysia',
      userReviews: [
        'Excellent results, my nose looks natural and perfect!',
        'The surgeon was very skilled and professional.',
      ],
      starRating: 4.9,
      price: '$3500',
      tip: 'Open rhinoplasty offers precise reshaping for complex nasal structures.',
    },
    {
      title: 'Closed Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Nose Reshaping Experts',
      address: '45 Jalan Ampang, Kuala Lumpur, Malaysia',
      userReviews: [
        'Minimal scarring with amazing results.',
        'The recovery process was smooth and quick.',
      ],
      starRating: 4.8,
      price: '$3000',
      tip: 'A minimally invasive approach for subtle nasal adjustments.',
    },
    {
      title: 'Septoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Sinus Relief Clinic',
      address: '33 Jalan Tun Razak, Kuala Lumpur, Malaysia',
      userReviews: [
        'Breathing much better after the surgery.',
        'Professional care and great follow-up support.',
      ],
      starRating: 4.7,
      price: '$2500',
      tip: 'Corrective surgery to fix a deviated septum and improve breathing.',
    },
    {
      title: 'Revision Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Rhinoplasty Specialists',
      address: '87 Jalan Imbi, Kuala Lumpur, Malaysia',
      userReviews: [
        'Corrected my previous surgery beautifully.',
        'Highly skilled team and supportive staff.',
      ],
      starRating: 4.8,
      price: '$5000',
      tip: 'Specialized surgery for fixing issues from a previous rhinoplasty.',
    },
    {
      title: 'Functional Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Breathing Wellness Center',
      address: '60 Jalan Cheras, Kuala Lumpur, Malaysia',
      userReviews: [
        'Aesthetic and functional improvement combined.',
        'The surgeon explained everything thoroughly.',
      ],
      starRating: 4.9,
      price: '$4000',
      tip: 'Combines aesthetic and functional goals for a better nose and breathing.',
    },
    {
      title: 'Tip Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Cosmetic Nose Surgery Clinic',
      address: '20 Jalan Sultan Ismail, Kuala Lumpur, Malaysia',
      userReviews: [
        'Refined the shape of my nose tip perfectly.',
        'Minimal downtime and great results.',
      ],
      starRating: 4.8,
      price: '$2000',
      tip: 'Focused reshaping for a more refined and symmetrical nose tip.',
    },
    {
      title: 'Non-Surgical Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Aesthetic Enhancement Clinic',
      address: '112 Jalan Tunku Abdul Rahman, Kuala Lumpur, Malaysia',
      userReviews: [
        'Quick and painless procedure.',
        'A great temporary solution before deciding on surgery.',
      ],
      starRating: 4.8,
      price: '$800',
      tip: 'Non-invasive filler-based reshaping with no downtime.',
    },
    {
      title: 'Ethnic Rhinoplasty',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Cultural Aesthetic Surgery Center',
      address: '15 Jalan Raja Laut, Kuala Lumpur, Malaysia',
      userReviews: [
        'Respected my cultural features while enhancing my look.',
        'Very understanding and skilled surgeon.',
      ],
      starRating: 4.9,
      price: '$4500',
      tip: 'Customized rhinoplasty preserving ethnic identity and enhancing aesthetics.',
    },
  ];

  userReview = [
    {
      name: 'John Doe',
      star: 5,
      description: 'Excellent service and very professional staff.',
      date: '2024-11-01',
    },
    {
      name: 'Emily Smith',
      star: 4,
      description: 'Great experience, but the waiting time could be improved.',
      date: '2024-11-02',
    },
    {
      name: 'Michael Brown',
      star: 3,
      description: 'Decent care but lacked proper follow-up.',
      date: '2024-11-03',
    },
    {
      name: 'Sarah Johnson',
      star: 5,
      description: 'Very friendly and knowledgeable doctors.',
      date: '2024-11-04',
    },
    {
      name: 'David Wilson',
      star: 4,
      description: 'Clean facility with good care provided.',
      date: '2024-11-05',
    },
    {
      name: 'Anna Martinez',
      star: 2,
      description: 'Service was slow and the staff seemed unorganized.',
      date: '2024-11-06',
    },
    {
      name: 'James Taylor',
      star: 5,
      description: 'Quick diagnosis and excellent treatment.',
      date: '2024-11-07',
    },
    {
      name: 'Sophia Anderson',
      star: 4,
      description:
        'Doctors were great, but the clinic needs better parking options.',
      date: '2024-11-08',
    },
    {
      name: 'Robert Thomas',
      star: 1,
      description: 'Had a very bad experience; not recommended.',
      date: '2024-11-09',
    },
    {
      name: 'Olivia Lee',
      star: 5,
      description: 'Exceptional service and very caring staff.',
      date: '2024-11-10',
    },
    {
      name: 'William Garcia',
      star: 3,
      description: 'The doctor was good, but the reception staff were rude.',
      date: '2024-11-11',
    },
    {
      name: 'Ava Davis',
      star: 5,
      description: 'Highly recommend this clinic. Great experience!',
      date: '2024-11-12',
    },
    {
      name: 'Alexander Martinez',
      star: 2,
      description: 'Too expensive for the quality of service provided.',
      date: '2024-11-13',
    },
    {
      name: 'Isabella White',
      star: 4,
      description: 'Good clinic, but it could be better organized.',
      date: '2024-11-14',
    },
    {
      name: 'Noah Harris',
      star: 5,
      description: 'Amazing service. Thank you for taking care of me!',
      date: '2024-11-15',
    },
    {
      name: 'Mia Robinson',
      star: 4,
      description:
        'Doctors were professional, but the waiting time was too long.',
      date: '2024-11-16',
    },
    {
      name: 'Liam Clark',
      star: 3,
      description: 'Average experience. The clinic could improve its hygiene.',
      date: '2024-11-17',
    },
    {
      name: 'Ella Lewis',
      star: 5,
      description: 'Fantastic clinic. Highly efficient and caring team.',
      date: '2024-11-18',
    },
    {
      name: 'Benjamin Walker',
      star: 2,
      description: 'Not satisfied with the treatment received.',
      date: '2024-11-19',
    },
    {
      name: 'Charlotte Young',
      star: 4,
      description:
        'Good experience overall, but the billing process needs improvement.',
      date: '2024-11-20',
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
    // AOS.init({ disable: 'mobile' });
   


  }

  ngAfterViewInit(): void {
    AOS.init()
    AOS.refresh();
  }

  suggestionsDentalSwiper(): void {
    new Swiper('.cardSwiper', {
      slidesPerView: 4,
      spaceBetween: 1,
      centeredSlides: true,
  
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  dentalServiceSwiper(): void {
    new Swiper('.cardSwiper', {
      slidesPerView: 4,
      spaceBetween: 1,
      centeredSlides: true,
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

  initializedentalSwiper(): void {
    new Swiper('.dentalSwiper', {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
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

  getImageFromAWS() {
    this.awsService.listFolderContents().subscribe({
      next: (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob); // Convert Blob to Object URL
        console.log('👉👉👉👉👉', this.imageUrl);
      },
      error: err => {
        console.error('Error fetching the image:', err);
      },
    });
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

  navigateToPage(data: any) {
    const getData = data.specialty;

    switch (getData) {
      case 'Dentist':
        this.router.navigate(['speciality']);
        break;

      default:
        break;
    }
  }
}
