import {
  style,
  trigger,
  state,
  transition,
  animate,
} from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';



@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrl: './feature-section.component.scss',

})
export class FeatureSectionComponent {
  shoes: any[] = [
    {value: 'boots', name: 'Boots'},
    {value: 'clogs', name: 'Clogs'},
    {value: 'loafers', name: 'Loafers'},
    {value: 'moccasins', name: 'Moccasins'},
    {value: 'sneakers', name: 'Sneakers'},
  ];
}
