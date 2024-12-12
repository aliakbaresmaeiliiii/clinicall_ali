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
        console.log('👉👉👉👉👉', this.imageUrl);
      },
      error: err => {
        console.error('Error fetching the image:', err);
      },
    });
  }


  incrementCounter(): void {
    interval(80)
      .pipe(takeWhile(() => this.counter < this.maxCounter))
      .subscribe(() => {
        this.counter++;
      });
  }


}
