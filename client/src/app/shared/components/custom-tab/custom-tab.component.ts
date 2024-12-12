import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { DoctorsService } from '../../../modules/doctors/doctors.service';
import { DoctorsDTO } from '../../../modules/doctors/models/doctors';
@Component({
  selector: 'generic-tab',
  imports: [MatTabsModule, CommonModule, MatButtonModule, MatSelectModule],
  providers: [AsyncPipe],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabComponent implements AfterViewInit {

  filterOptions = [
    { key: 'default', label: 'Default' },
    { key: 'mostPopular', label: 'Most Popular' },
    { key: 'lowestPrice', label: 'The Lowest Price' },
    { key: 'highestPrice', label: 'The Highest Price' },
    { key: 'nearestVisited', label: 'Nearest Visited' },
    { key: 'closelyAppointment', label: 'Closely Appointment' },
    { key: 'highestScore', label: 'Highest Score' },
  ];

  dentalServices = [
    { id: 1, name: 'Dental Cleaning' },
    { id: 2, name: 'Teeth Whitening' },
    { id: 3, name: 'Cavity Filling' },
    { id: 4, name: 'Root Canal' },
    { id: 5, name: 'Dental Implants' },
    { id: 6, name: 'Braces & Aligners' },
    { id: 7, name: 'Wisdom Tooth Extraction' },
    { id: 8, name: 'Gum Disease Treatment' },
  ];
  maximumPrice = [
    { id: 1, price: 1150 },
    { id: 2, price: 1300 },
    { id: 3, price: 1200 },
    { id: 4, price: 1500 },
    { id: 5, price: 12000 },
    { id: 6, price: 14000 },
    { id: 7, price: 1250 },
    { id: 8, price: 1350 },
  ];
  minimumPrice = [
    { id: 1, price: 150 },
    { id: 2, price: 300 },
    { id: 3, price: 200 },
    { id: 4, price: 500 },
    { id: 5, price: 2000 },
    { id: 6, price: 4000 },
    { id: 7, price: 250 },
    { id: 8, price: 350 },
  ];

  activeFilter = 'default';

  tabs = input.required<
    {
      id: number;
      title: string;
      template: TemplateRef<any>;
      context?: any;
    }[]
  >();
  readonly selectedIndexChange = output<number>();
  selectedTemplate!: TemplateRef<any>;
  context: any;
  readonly selectedIndex = input(0);

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    const data = this.tabs();
    if (data.length > 0) {
      this.setSelectedTab(0);
    }
  }

  onTabChanged(data: any) {
    if (this.tabs().length > data.index) {
      this.setSelectedTab(data.index);
      this.selectedIndexChange.emit(data.index);
    }
  }

  private setSelectedTab(index: number) {
    const selectedTab = this.tabs()[index];
    this.selectedTemplate = selectedTab.template;
    this.context = { $implicit: selectedTab.context };
  }

  setActiveFilter(key: any) {
    this.activeFilter = key;
  }


}
