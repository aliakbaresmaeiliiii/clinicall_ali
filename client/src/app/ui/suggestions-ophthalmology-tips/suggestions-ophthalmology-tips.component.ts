import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions-ophthalmology-tips',
  standalone: false,
  templateUrl: './suggestions-ophthalmology-tips.component.html',
  styleUrl: './suggestions-ophthalmology-tips.component.scss',
})
export class SuggestionsOphthalmologyTipsComponent {
  ophthalmologyTips = [
    {
      id: 1,
      name: 'Mesotherapy',
      description: 'Deep cleansing and nourishing for healthy skin.',
      src: '../../../assets/images/ui/hair&skin/Mesotherapy.webp',
      count: 400,
      price: 120,
      discount: 10,
      doctorName: 'Dr. Sarah Johnson',
      doctorImage: '../../../assets/images/doctors/DrSarah.jpg',
      prodcutImgae: '../../../assets/images/ui/hair&skin/Mesotherapy.webp',
      star: 4.5,
      address: '123 SkinCare Ave, Beauty City',
      briefDescription:
        'Mesotherapy revitalizes your skin by delivering essential nutrients directly to the dermis.',
    },
  ];
}
