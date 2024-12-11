import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-suggestions-psychology-tips',
  standalone: false,
  templateUrl: './suggestions-psychology-tips.component.html',
  styleUrl: './suggestions-psychology-tips.component.scss',
})
export class SuggestionsPsychologyTipsComponent  {
  psychologyTips = [
    {
      id: 2,
      name: 'Laser Hair Removal',
      description: 'Professional haircuts and custom styling.',
      src: '../../../assets/images/ui/hair&skin/Laser Hair Removal.jpg',
      count: 400,
      price: 300,
      discount: 15,
      doctorName: 'Dr. Michael Lee',
      doctorImage: '../../../assets/images/doctors/DrMichael.jpg',
      prodcutImgae: '../../../assets/images/ui/hair&skin/Laser Hair Removal.jpg',
      star: 4.7,
      address: '456 Glow Street, Shine Town',
      briefDescription:
        'Laser hair removal offers smooth and hair-free skin using advanced laser technology.',
    },

  ];



}
