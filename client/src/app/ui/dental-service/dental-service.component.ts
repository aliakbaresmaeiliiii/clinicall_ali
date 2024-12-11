import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-dental-service',
  standalone: false,
  templateUrl: './dental-service.component.html',
  styleUrl: './dental-service.component.scss',
})
export class DentalServiceComponent  {
  swiperDataDentistry = [
    {
      id: 1,
      name: "Dental Implant",
      description: "Restore missing teeth with permanent and durable implants.",
      src: "../../../assets/images/ui/Dental/Dental Implant.webp",
      count: 500,
    },
    {
      id: 2,
      name: "Dental Veneers",
      description: "Enhance your smile with custom-made veneers.",
      src: "../../../assets/images/ui/Dental/Dental Veneers.webp",
      count: 300,
    },
    {
      id: 3,
      name: "Teeth Whitening",
      description: "Professional teeth whitening for a brighter smile.",
      src: "../../../assets/images/ui/Dental/Teeth Whitening.jpeg",
      count: 600,
    },
    {
      id: 4,
      name: "Orthodontics",
      description: "Straighten your teeth with braces and aligners.",
      src: "../../../assets/images/ui/Dental/Orthodontics.jpg",
      count: 400,
    },
    {
      id: 5,
      name: "Root Canal Therapy",
      description: "Save your natural teeth with expert root canal treatments.",
      src: "../../../assets/images/ui/Dental/Root Canal Therapy.png",
      count: 700,
    },
    {
      id: 6,
      name: "Dental Cleaning",
      description: "Maintain oral hygiene with professional teeth cleaning.",
      src: "../../../assets/images/ui/Dental/Dental Cleaning.webp",
      count: 800,
    },
    {
      id: 7,
      name: "Dental Crowns",
      description: "Restore tooth function and aesthetics with dental crowns.",
      src: "../../../assets/images/ui/Dental/Dental Crowns.jpg",
      count: 350,
    },
  ];
  



}
