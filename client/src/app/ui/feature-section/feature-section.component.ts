import { Component, inject, OnInit } from '@angular/core';
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
export class FeatureSectionComponent implements OnInit {
  counter: number = 0;
  maxCounter: number = 20;
  isLoading = false;
  router = inject(Router);
  awsService = inject(AmazonService);
  exchangeRate = 42000;

  imagesServices = [
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist & Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist & Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/women.png',
      key: 1,
      specialty: 'Gynecologist & Obstetrician',
      count: 3000,
    },
    {
      src: '../../../assets/images/ui/speciality/skin.png',
      key: 2,
      specialty: 'Dermatologist & Aesthetic Specialist',
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

  cartInfo = [
    {
      title: 'Online medical consultation',
      image: '/assets/images/ui/call.png',
      subtitle: '',
      description: 'Rapidiously reinvent long-term impact collaboration',
      paragraph: '180 Doctors',
    },
    {
      title: 'In-person doctor visit',
      image: '/assets/images/ui/heart.png',

      subtitle: '',
      description: 'Seamlessly schedule appointments with nearby doctors.',
      paragraph: '120 Clinics Available',
    },
    {
      title: 'Order prescription medicines',
      image: '/assets/images/ui/fragile-x-drug-combination.jpg',
      subtitle: '',
      description: 'Get your medicines delivered right to your doorstep.',
      paragraph: '500+ Medications Available',
    },
    {
      title: 'Health check-up packages',
      image: '/assets/images/ui/discount.jpg',
      subtitle: '',
      description: 'Comprehensive health check-up plans for your wellbeing.',
      paragraph: '40% Discount on Packages',
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

  psychologyTips = [
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/1.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Hope Counseling Center',
      address: '123 Wellness Street, Kuala Lumpur, Malaysia',
      userReviews: [
        'Excellent service and professional counselors!',
        'A very supportive environment for personal growth.',
      ],
      starRating: 4.8,
      promotion: '20% Off',
      pricePerSession: '4000$',
      tip: 'In-person individual counseling to improve mental well-being.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/2.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Peaceful Minds Therapy',
      address: '456 Serenity Avenue, Johor Bahru, Malaysia',
      userReviews: [
        'Great therapists who really listen.',
        'Highly recommended for stress management.',
      ],
      starRating: 4.7,
      promotion: '20% Off',
      pricePerSession: '60$ (60-minute session)',
      tip: 'Group therapy sessions to build resilience and community support.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/3.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Harmony Psychological Services',
      address: '789 Balance Road, Penang, Malaysia',
      userReviews: [
        'Helped me overcome anxiety with practical techniques.',
        'The atmosphere is very calming and welcoming.',
      ],
      starRating: 4.6,
      promotion: '20% Off',
      pricePerSession: '50$ (45-minute session)',
      tip: 'Online therapy options available for convenience.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/4.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Mindful Journey Center',
      address: '10 Peace Lane, Malacca, Malaysia',
      userReviews: [
        'Their mindfulness sessions are life-changing.',
        'Friendly staff and highly skilled psychologists.',
      ],
      starRating: 4.9,
      promotion: '20% Off',
      pricePerSession: '65$ (60-minute session)',
      tip: 'Specializes in mindfulness and stress reduction therapies.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/5.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Bright Horizons Therapy',
      address: '55 Positive Way, Ipoh, Malaysia',
      userReviews: [
        'Helped me with effective anger management techniques.',
        'I feel more in control of my emotions.',
      ],
      starRating: 4.5,
      promotion: '20% Off',
      pricePerSession: '80$ (60-minute session)',
      tip: 'Focus on emotional regulation and positive thinking.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/6.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Balance Mental Health Clinic',
      address: '32 Stability Drive, Kuching, Malaysia',
      userReviews: [
        'Highly recommended for work-life balance issues.',
        'I gained valuable insights into my personal challenges.',
      ],
      starRating: 4.7,
      promotion: '20% Off',
      pricePerSession: '70$ (60-minute session)',
      tip: 'Tailored programs for work-life balance and productivity.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/7.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Tranquil Thoughts Therapy',
      address: '45 Relaxation Avenue, Kota Kinabalu, Malaysia',
      userReviews: [
        'A peaceful environment for mental relaxation.',
        'Therapists are incredibly empathetic and understanding.',
      ],
      starRating: 4.8,
      promotion: '20% Off',
      pricePerSession: '55$ (45-minute session)',
      tip: 'Relaxation techniques and anxiety management sessions.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/8.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Healing Minds Counseling',
      address: '89 Recovery Street, Shah Alam, Malaysia',
      userReviews: [
        'Helped me heal from past trauma.',
        'The staff is very caring and supportive.',
      ],
      starRating: 4.9,
      promotion: '20% Off',
      pricePerSession: '90$ (75-minute session)',
      tip: 'Specialized in trauma recovery and emotional healing.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/9.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Insight Therapy Center',
      address: '12 Clarity Boulevard, Putrajaya, Malaysia',
      userReviews: [
        'I gained new perspectives on my challenges.',
        'Their insights were very impactful for my growth.',
      ],
      starRating: 4.7,
      promotion: '20% Off',
      pricePerSession: '75$ (60-minute session)',
      tip: 'Provides clarity and insight into personal issues.',
    },
    {
      imgSergury: '../../../assets/images/ui/psychologyTips/10.jpg',
      doctorImg: '../../.././assets/images/ui/doctors/5.jpg',
      centerName: 'Serene Path Counseling',
      address: '34 Calm Road, George Town, Malaysia',
      userReviews: [
        'The sessions improved my confidence greatly.',
        'Very professional and compassionate service.',
      ],
      starRating: 4.6,
      promotion: '20% Off',
      pricePerSession: '85$ (60-minute session)',
      tip: 'Building self-esteem and confidence through therapy.',
    },
    // Additional entries follow the same format...
  ];

  ophthalmologyTips = [
    {
      title: 'Femto-SMILE',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/1.jpg',
      centerName: 'Visionary Eye Center',
      address: '123 Jalan Tun Razak, Kuala Lumpur, Malaysia',
      userReviews: [
        'Exceptional service and modern facilities!',
        'I had an amazing experience with their advanced treatments.',
      ],
      starRating: 4.9,
      price: '2500$',
      tip: 'A minimally invasive laser eye surgery for vision correction.',
    },
    {
      title: 'Cataract Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/2.jpg',
      centerName: 'Bright Eyes Clinic',
      address: '456 Jalan Gasing, Petaling Jaya, Malaysia',
      userReviews: [
        'The cataract surgery was smooth and painless.',
        'Highly professional staff and a caring environment.',
      ],
      starRating: 4.8,
      price: '3000$',
      tip: 'Safe and effective removal of cataracts for clearer vision.',
    },
    {
      title: 'LASIK',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/3.jpg',
      centerName: 'Perfect Vision Center',
      address: '789 Jalan Sultan Ismail, Kuala Lumpur, Malaysia',
      userReviews: [
        'My vision is perfect now thanks to their LASIK procedure.',
        'State-of-the-art technology and great post-care service.',
      ],
      starRating: 4.9,
      price: '2000$',
      tip: 'Quick and effective laser eye surgery to correct refractive errors.',
    },
    {
      title: 'Glaucoma Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/4.jpg',
      centerName: 'Eye Wellness Clinic',
      address: '21 Jalan Meru, Klang, Malaysia',
      userReviews: [
        'They helped manage my glaucoma with care and expertise.',
        'Highly recommend for anyone with eye pressure issues.',
      ],
      starRating: 4.7,
      price: '1500$',
      tip: 'Comprehensive care for managing intraocular pressure effectively.',
    },
    {
      title: 'Retinal Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/5.jpg',
      centerName: 'Advanced Retina Center',
      address: '33 Jalan Tebrau, Johor Bahru, Malaysia',
      userReviews: [
        'Their expertise in retinal care is unmatched.',
        'I felt confident throughout my treatment process.',
      ],
      starRating: 4.8,
      price: '4000$',
      tip: 'Specialized surgery for retinal detachment and other retinal issues.',
    },
    {
      title: 'Dry Eye Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/6.jpg',
      centerName: 'Comfort Vision Clinic',
      address: '55 Jalan Air Itam, George Town, Malaysia',
      userReviews: [
        'Their treatment relieved my dry eye symptoms significantly.',
        'The clinic is very clean, and the staff is super friendly.',
      ],
      starRating: 4.6,
      price: '1200$',
      tip: 'Effective solutions for chronic dry eye problems.',
    },
    {
      title: 'Corneal Transplant',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/7.jpg',
      centerName: 'Cornea Care Center',
      address: '14 Jalan Lintas, Kota Kinabalu, Malaysia',
      userReviews: [
        'Professional and compassionate care for my transplant.',
        'I now have clear vision thanks to their expertise.',
      ],
      starRating: 4.9,
      price: '5000$',
      tip: 'Restores vision by replacing damaged corneal tissue.',
    },
    {
      title: 'Pediatric Ophthalmology',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/8.jpg',
      centerName: 'Little Eyes Clinic',
      address: '28 Jalan Wong Ah Fook, Johor Bahru, Malaysia',
      userReviews: [
        'Great care for children’s eye problems.',
        'They made my child feel comfortable during the treatment.',
      ],
      starRating: 4.8,
      price: '1800$',
      tip: 'Expert eye care services for children and adolescents.',
    },
    {
      title: 'Orthokeratology',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/9.jpg',
      centerName: 'Vision Shapers Center',
      address: '40 Jalan Ampang, Kuala Lumpur, Malaysia',
      userReviews: [
        'Their night lenses have improved my eyesight.',
        'A unique approach to managing myopia progression.',
      ],
      starRating: 4.7,
      price: '2500$',
      tip: 'Non-surgical vision correction using customized contact lenses.',
    },
    {
      title: 'Eye Screening',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/10.jpg',
      centerName: 'Complete Vision Care',
      address: '90 Jalan Ipoh, Kuala Lumpur, Malaysia',
      userReviews: [
        'Comprehensive screening and detailed explanations.',
        'The staff was very thorough and professional.',
      ],
      starRating: 4.8,
      price: '100$',
      tip: 'Routine eye examinations to detect and prevent vision problems.',
    },
    {
      title: 'Contact Lens Fitting',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/11.jpg',
      centerName: 'Lens Experts Clinic',
      address: '22 Jalan Melaka, Melaka City, Malaysia',
      userReviews: [
        'Perfectly fitted contact lenses for my needs.',
        'The staff were patient and helpful in selecting lenses.',
      ],
      starRating: 4.8,
      price: '300$',
      tip: 'Personalized contact lens fitting for optimal comfort and vision.',
    },
    {
      title: 'Diabetic Retinopathy Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/12.jpg',
      centerName: 'Vision Plus Diabetes Care',
      address: '10 Jalan Tun Fuad, Sabah, Malaysia',
      userReviews: [
        'Excellent care for diabetic eye conditions.',
        'The doctor explained everything clearly.',
      ],
      starRating: 4.7,
      price: '3500$',
      tip: 'Specialized treatment for diabetes-related eye problems.',
    },
    {
      title: 'Eyelid Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/13.jpg',
      centerName: 'Eye Beauty Center',
      address: '80 Jalan Alor, Kuala Lumpur, Malaysia',
      userReviews: [
        'My eyelids feel and look amazing after the surgery.',
        'Great results and caring doctors.',
      ],
      starRating: 4.9,
      price: '2000$',
      tip: 'Cosmetic and functional surgeries for eyelids.',
    },
    {
      title: 'Strabismus Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/14.jpg',
      centerName: 'Aligned Vision Clinic',
      address: '15 Jalan Bukit Bintang, Kuala Lumpur, Malaysia',
      userReviews: [
        'My child’s strabismus is completely corrected.',
        'Thankful for their professional approach.',
      ],
      starRating: 4.8,
      price: '2500$',
      tip: 'Surgery to correct eye misalignment for improved vision.',
    },
    {
      title: 'Macular Degeneration Treatment',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/15.jpg',
      centerName: 'Retina Vision Center',
      address: '60 Jalan Penang, George Town, Malaysia',
      userReviews: [
        'Top-notch care for my macular degeneration.',
        'Highly skilled doctors and great results.',
      ],
      starRating: 4.8,
      price: '5000$',
      tip: 'Advanced treatments to slow vision loss due to macular degeneration.',
    },
    {
      title: 'Eye Trauma Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/16.jpg',
      centerName: 'Emergency Eye Center',
      address: '30 Jalan Raja Laut, Kuala Lumpur, Malaysia',
      userReviews: [
        'Saved my eye after a severe injury.',
        'Quick and expert response to my emergency.',
      ],
      starRating: 4.9,
      price: '4500$',
      tip: 'Urgent care and surgery for traumatic eye injuries.',
    },
    {
      title: 'Eye Prosthetics',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/17.jpg',
      centerName: 'Vision Aesthetics Center',
      address: '77 Jalan Imbi, Kuala Lumpur, Malaysia',
      userReviews: [
        'My prosthetic eye looks completely natural.',
        'Wonderful service and attention to detail.',
      ],
      starRating: 4.9,
      price: '3500$',
      tip: 'Custom prosthetic eyes for improved aesthetics and confidence.',
    },
    {
      title: 'Optical Coherence Tomography (OCT)',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/18.jpg',
      centerName: 'Tech-Eye Diagnostics',
      address: '42 Jalan Ampang, Kuala Lumpur, Malaysia',
      userReviews: [
        'Detailed imaging helped diagnose my eye issue accurately.',
        'Quick and precise service.',
      ],
      starRating: 4.8,
      price: '1500$',
      tip: 'Advanced imaging for diagnosing eye conditions.',
    },
    {
      title: 'Vision Therapy',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/19.jpg',
      centerName: 'Eye Strength Center',
      address: '90 Jalan Ipoh, Kuala Lumpur, Malaysia',
      userReviews: [
        'My vision has improved drastically after therapy sessions.',
        'Friendly and experienced therapists.',
      ],
      starRating: 4.7,
      price: '800$',
      tip: 'Customized therapy to strengthen and improve visual skills.',
    },
    {
      title: 'Eye Tumor Surgery',
      imgSurgery: '../../../assets/images/ui/ophthalmologyTips/1.jpg',
      doctorImg: '../../../assets/images/ui/doctors/20.jpg',
      centerName: 'Vision Oncology Center',
      address: '50 Jalan Raja Chulan, Kuala Lumpur, Malaysia',
      userReviews: [
        'My tumor was removed successfully with great care.',
        'The team is extremely skilled and compassionate.',
      ],
      starRating: 4.9,
      price: '7000$',
      tip: 'Specialized care for eye tumors with precision surgery.',
    },
  ];

  urologyTips = [
    {
      title: 'Prostate Treatment',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Prostate Wellness Clinic',
      address: '123 Jalan Tun Razak, Kuala Lumpur, Malaysia',
      userReviews: [
        'Highly effective treatment with no side effects.',
        'The doctor was professional and very caring.',
      ],
      starRating: 4.8,
      price: '$3000',
      tip: 'Advanced treatments for prostate issues to prevent long-term complications.',
    },
    {
      title: 'Kidney Stone Surgery',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Renal Health Center',
      address: '45 Jalan Ampang, Kuala Lumpur, Malaysia',
      userReviews: [
        'The surgery was smooth and the recovery quick.',
        'State-of-the-art facilities and great post-surgery care.',
      ],
      starRating: 4.7,
      price: '$3500',
      tip: 'Minimally invasive procedures for safe and quick kidney stone removal.',
    },
    {
      title: 'Urinary Tract Infection (UTI) Treatment',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'UTI Care Center',
      address: '87 Jalan Bukit Bintang, Kuala Lumpur, Malaysia',
      userReviews: [
        'The doctor provided clear advice and quick relief.',
        'Effective medication with no side effects.',
      ],
      starRating: 4.9,
      price: '$150',
      tip: 'Expert treatment for UTIs with quick diagnosis and effective medication.',
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

  suggestions = [
    {
      title: 'Advanced Skin Treatment',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Dermatology Excellence Clinic',
      address: '12 Jalan Sultan Ismail, Kuala Lumpur, Malaysia',
      starRating: 4.8,
      tip: 'Rejuvenate your skin with personalized treatment plans.',
    },
    {
      title: 'Dental Implants',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Smile Care Dental Center',
      address: '45 Jalan Ampang, Kuala Lumpur, Malaysia',
      starRating: 4.9,
      tip: 'Permanent and natural-looking solutions for missing teeth.',
    },
    {
      title: 'Knee Replacement Surgery',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Orthopedic Specialist Hospital',
      address: '87 Jalan Cheras, Kuala Lumpur, Malaysia',
      starRating: 4.7,
      tip: 'Regain mobility and comfort with cutting-edge joint surgery.',
    },
    {
      title: 'Lasik Eye Surgery',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Vision Enhancement Center',
      address: '60 Jalan Bukit Bintang, Kuala Lumpur, Malaysia',
      starRating: 4.9,
      tip: 'Achieve clear vision without glasses or contact lenses.',
    },
    {
      title: 'Weight Loss Program',
      imgSurgery: '',
      doctorImg: '',
      centerName: 'Wellness Clinic Malaysia',
      address: '33 Jalan Tun Razak, Kuala Lumpur, Malaysia',
      starRating: 4.8,
      tip: 'Customized diet and exercise plans to achieve your goals.',
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
    this.getImageFromAWS();

    this.incrementCounter();
    AOS.init({ disable: 'mobile' });
    AOS.refresh();

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







    // var swiper = new Swiper('.serviceSwiper', {
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

    // var swiper = new Swiper('.DermatologySwiper', {
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

    // var swiper = new Swiper('.beautySwiper', {
    //   slidesPerView: 4,
    //   spaceBetween: 20,
    //   centeredSlides: true,
    //   // autoplay: {
    //   //   delay: 2500,
    //   //   disableOnInteraction: false,
    //   // },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });

    // var swiper = new Swiper('.mySwiper', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'progressbar',
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });
    AOS.init({ disable: 'mobile' });
    AOS.refresh();
  }

  fileUrls: string[] = [];
  imageUrl: any;



  getImageFromAWS() {
    this.awsService.listFolderContents().subscribe({
      next: (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob); // Convert Blob to Object URL
        console.log('👉👉👉👉👉',this.imageUrl);
      },
      error: (err) => {
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
    console.log('👉👉👉👉', getData);

    switch (getData) {
      case 'Dentist':
        this.router.navigate(['speciality']);
        break;

      default:
        break;
    }
    debugger;
  }
}
