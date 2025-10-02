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
 
 cartInfo = [
    {
      title: 'Online medical & hospital consultation',
      image: '/assets/images/hospital.jpg',
      subtitle: '',
      description: 'Rapidiously reinvent long-term impact collaboration',
      paragraph: '180 Doctors',
    },
    {
      title: 'In-person doctor visit',
      image: '/assets/images/online.jpg',

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


  ngOnInit() {
    this.incrementCounter();
    // AOS.init({ disable: 'mobile' });
  }

  ngAfterViewInit(): void {
    AOS.init()
    AOS.refresh();
  }
 
  getImageFromAWS() {
    this.awsService.listFolderContents().subscribe({
      next: (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob); // Convert Blob to Object URL
      },
      error: err => {
        console.error('Error fetching the image:', err);
      },
    });
  }

   doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: 12,
      location: 'Downtown Medical Center',
      image: '../../../assets/images/ui/doctors/1.jpg'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      rating: 4.8,
      experience: 15,
      location: 'City General Hospital',
      image: '../../../assets/images/ui/doctors/2.jpg'
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.9,
      experience: 8,
      location: 'Childrens Health Center',
      image: '../../../assets/images/ui/doctors/3.jpg'
    },
    {
      name: 'Dr. Robert Kim',
      specialty: 'Orthopedic Surgeon',
      rating: 4.7,
      experience: 20,
      location: 'Sports Medicine Institute',
      image: '../../../assets/images/ui/doctors/4.jpg'
    }
  ];


  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }

  scrollToServices(): void {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getServiceIcon(index: number): string {
    const icons = ['🏥', '👨‍⚕️', '💊', '📋'];
    return icons[index] || '🏥';
  }


}
