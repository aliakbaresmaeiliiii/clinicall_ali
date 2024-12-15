import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
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
    { key: 0, label: 'Default' },
    { key: 1, label: 'Most Popular' },
    // { key: 2, label: 'The Lowest Price' },
    // { key: 3, label: 'The Highest Price' },
    { key: 4, label: 'Nearest Visited' },
    { key: 5, label: 'Closely Appointment' },
    { key: 6, label: 'Most successful turns' },
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

  activeFilter = 0;

  tabs = input.required<
    {
      id: number;
      title: string;
      template: TemplateRef<any>;
      context?: any;
    }[]
  >();
  selectedTemplate!: TemplateRef<any>;
  context: any;
  readonly selectedIndex = input(0);
  tabTitle = output<string>();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const data = this.tabs();
    if (data.length > 0) {
      this.setSelectedTab(0);
    }
  }

  onTabChanged(data: any) {
    if (this.tabs().length > data.index) {
      this.setSelectedTab(data.index);
    }
  }

  private setSelectedTab(index: number) {
    const selectedTab = this.tabs()[index];
    this.selectedTemplate = selectedTab.template;
    this.context = { $implicit: selectedTab.context };
  }

  setActiveFilter(tab: any) {
    this.activeFilter = tab.key;
    this.tabTitle.emit(tab);
  }
}
