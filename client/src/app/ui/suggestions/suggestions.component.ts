import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  standalone: false,
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss',
})
export class SuggestionsComponent {
  yoursDoctorSuggestion = [
    {
      id: 1,
      title: '3D Rhinoplasty Planning',
      description: 'Advanced 3D imaging for personalized surgical planning.',
      count: 120,
      price: 5000,
      discount: 15,
      doctorName: 'Dr. William Johnson',
      doctorImage: '/assets/images/ui/doctors/1.jpg',
      productImage: '/assets/images/ui/rhinoplasty/3D Rhinoplasty Planning.jpeg',
      star: 4.9,
      address: '707 Innovation Lane, Future Town',
    },
    {
      id: 2,
      title: 'Mesotherapy',
      description: 'Deep cleansing and nourishing for healthy skin.',
      count: 400,
      price: 120,
      discount: 10,
      doctorName: 'Dr. Sarah Johnson',
      doctorImage: '/assets/images/ui/doctors/1.jpg',
      productImage: '/assets/images/ui/hair&skin/Mesotherapy.webp',
      star: 4.5,
      address: '123 SkinCare Ave, Beauty City',
    },
    {
      id: 3,
      title: 'Teeth Whitening',
      description:
        'Brighten your smile with professional whitening treatments.',
      count: 300,
      price: 250,
      discount: 20,
      doctorName: 'Dr. Jane Smith',
      doctorImage: '/assets/images/ui/doctors/3.jpg',
      productImage: '/assets/images/ui/Dental/Teeth Whitening.jpeg',
      star: 4.7,
      address: '456 Bright Street, White Town',
    },
    {
      id: 4,
      title: 'Couples Therapy',
      description: 'Strengthen your relationship through effective counseling.',
      count: 180,
      price: 200,
      discount: 10,
      doctorName: 'Dr. William Johnson',
      doctorImage: '/assets/images/ui/doctors/4.jpg',
      productImage: '/assets/images/ui/psychologyTips/4.jpg',
      star: 4.6,
      address: '321 Love Street, Bonding City',
    },
    {
      id: 5,
      title: 'Dry Eye Treatment',
      description: 'Relieve discomfort and improve eye hydration with expert care.',
      count: 300,
      price: 120,
      discount: 10,
      doctorName: 'Dr. Mia Garcia',
      doctorImage: '/assets/images/ui/doctors/2.jpg',
      productImage: '/assets/images/ui/ophthalmologyTips/Dry Eye Treatment.jpeg',
      star: 4.6,
      address: '505 Comfort Blvd, TearDrop City',
    },
    {
      id: 6,
      title: 'Erectile Dysfunction Treatment',
      description: 'Personalized treatment plans for improved sexual health.',
      count: 220,
      price: 350,
      discount: 10,
      doctorName: 'Dr. Olivia Martinez',
      doctorImage: '/assets/images/ui/doctors/7.jpg',
      productImage: '/assets/images/ui/urologyTips/Erectile Dysfunction Treatment.jpg',
      star: 4.7,
      address: '606 Care Path, Vitality Town',
    },
  ];
}
