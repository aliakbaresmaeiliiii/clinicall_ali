import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; 



@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.scss',

})
export class FeatureSectionComponent implements OnInit {
  shoes: any[] = [
    {value: 'boots', name: 'Boots'},
    {value: 'clogs', name: 'Clogs'},
    {value: 'loafers', name: 'Loafers'},
    {value: 'moccasins', name: 'Moccasins'},
    {value: 'sneakers', name: 'Sneakers'},
  ];

  ngOnInit() {
    AOS.init({disable: 'mobile'});
    AOS.refresh();
  }
}
