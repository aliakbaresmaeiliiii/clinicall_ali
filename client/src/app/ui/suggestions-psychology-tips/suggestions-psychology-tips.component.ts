import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-suggestions-psychology-tips',
  standalone: false,
  templateUrl: './suggestions-psychology-tips.component.html',
  styleUrl: './suggestions-psychology-tips.component.scss',
})
export class SuggestionsPsychologyTipsComponent  {
   psychologyServices = [
    {
      id: 1,
      title: 'Cognitive Behavioral Therapy (CBT)',
      description: 'Effective therapy for managing anxiety, depression, and stress.',
      count: 300,
      price: 100,
      discount: 15,
      doctorName: 'Dr. Emma Carter',
      doctorImage: '../../../assets/images/ui/doctors/1.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/1.jpg',
      star: 4.8,
      address: '123 Wellness Blvd, Therapy City',
    },
    {
      id: 2,
      title: 'Family Counseling',
      description: 'Helping families improve communication and resolve conflicts.',
      count: 200,
      price: 150,
      discount: 10,
      doctorName: 'Dr. Robert Hall',
      doctorImage: '../../../assets/images/ui/doctors/2.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/2.jpg',
      star: 4.7,
      address: '456 Harmony Lane, Counseling Town',
    },
    {
      id: 3,
      title: 'Child Therapy',
      description: 'Specialized therapy for children dealing with emotional challenges.',
      count: 250,
      price: 120,
      discount: 20,
      doctorName: 'Dr. Olivia Moore',
      doctorImage: '../../../assets/images/ui/doctors/3.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/3.jpg',
      star: 4.9,
      address: '789 Care Avenue, Kids Zone City',
    },
    {
      id: 4,
      title: 'Couples Therapy',
      description: 'Strengthen your relationship through effective counseling.',
      count: 180,
      price: 200,
      discount: 10,
      doctorName: 'Dr. William Johnson',
      doctorImage: '../../../assets/images/ui/doctors/4.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/4.jpg',
      star: 4.6,
      address: '321 Love Street, Bonding City',
    },
    {
      id: 5,
      title: 'Trauma Therapy',
      description: 'Heal from past traumatic experiences with expert guidance.',
      count: 150,
      price: 180,
      discount: 15,
      doctorName: 'Dr. Sophia Martinez',
      doctorImage: '../../../assets/images/ui/doctors/5.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/5.jpg',
      star: 4.8,
      address: '654 Healing Road, Safe Haven Town',
    },
    {
      id: 6,
      title: 'Grief Counseling',
      description: 'Support for navigating the loss of a loved one.',
      count: 120,
      price: 100,
      discount: 10,
      doctorName: 'Dr. Noah Davis',
      doctorImage: '../../../assets/images/ui/doctors/7.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/6.jpg',
      star: 4.5,
      address: '987 Comfort Lane, Serenity City',
    },
    {
      id: 7,
      title: 'Stress Management',
      description: 'Techniques to reduce stress and enhance your well-being.',
      count: 400,
      price: 80,
      discount: 5,
      doctorName: 'Dr. Ava Wilson',
      doctorImage: '../../../assets/images/ui/doctors/8.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/7.jpg',
      star: 4.7,
      address: '159 Peace Avenue, Relaxation Town',
    },
    {
      id: 8,
      title: 'Anger Management',
      description: 'Learn to control anger and develop healthier coping strategies.',
      count: 300,
      price: 90,
      discount: 10,
      doctorName: 'Dr. Lucas Brown',
      doctorImage: '../../../assets/images/ui/doctors/9.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/8.jpg',
      star: 4.4,
      address: '753 Calm Street, Control City',
    },
    {
      id: 9,
      title: 'Addiction Counseling',
      description: 'Overcome addiction with expert care and support.',
      count: 220,
      price: 250,
      discount: 20,
      doctorName: 'Dr. Isabella Lopez',
      doctorImage: '../../../assets/images/ui/doctors/2.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/9.jpg',
      star: 4.6,
      address: '246 Recovery Blvd, Freedom Town',
    },
    {
      id: 10,
      title: 'Workplace Stress Counseling',
      description: 'Manage job-related stress and improve work-life balance.',
      count: 350,
      price: 110,
      discount: 15,
      doctorName: 'Dr. Elijah Taylor',
      doctorImage: '../../../assets/images/ui/doctors/7.jpg',
      productImage: '../../../assets/images/ui/psychologyTips/10.jpg',
      star: 4.5,
      address: '135 Career Avenue, Balance City',
    },
  ];
  


}
