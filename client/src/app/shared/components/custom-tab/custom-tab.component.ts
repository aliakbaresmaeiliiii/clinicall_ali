import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { DoctorsService } from '../../../modules/doctors/services/doctors.service';
@Component({
  selector: 'generic-tab',
  imports: [
    MatTabsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatDividerModule,
  ],
  providers: [AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  myControl = new FormControl('');
  clinicServicesForm = new FormControl('');
  neighborhoodForm = new FormControl('');
  cityForm = new FormControl('');
  insuranceForm = new FormControl('');
  specialties: string[] = [];
  clinicServices: string[] = [];
  cities: string[] = [];
  insurances: string[] = [];
  neighborhood: string[] = [];
  filteredSpeciality!: Observable<string[]>;
  filteredServices!: Observable<string[]>;
  filteredCity!: Observable<string[]>;
  filteredNeighborhood!: Observable<string[]>;
  filteredInsurance!: Observable<string[]>;
  doctorService = inject(DoctorsService);
  activeFilter = 0;
  tabTitle = output<string>();
  onChangeValueInput = output<string>();
  onDeleteValue = output<string>();
  valueOfSpeciality: string = '';

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

  constructor() {}

  ngOnInit() {
    this.getSpecialties();
    this.getClinicServices();
    this.getAllCities();
    this.getAllInsurances();
  }

  getSpecialties() {
    this.doctorService.getSpecialties().subscribe((data: any) => {
      this.specialties = data.data;
      this.filteredSpeciality = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const specialtyNames = this.specialties.map(
      (specialty: any) => specialty.name
    );
    return specialtyNames.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getClinicServices() {
    this.doctorService.getClinicServices().subscribe(res => {
      this.clinicServices = res.data;
      this.filteredServices = this.clinicServicesForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filterServices(value || ''))
      );
    });
  }

  private _filterServices(value: string): string[] {
    const filterValue = value.toLowerCase();
    const serviceName = this.clinicServices.map(
      (services: any) => services.service_name
    );
    return serviceName.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getAllCities() {
    this.doctorService.getAllCities().subscribe(res => {
      this.cities = res.data;
      this.filteredCity = this.cityForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCities(value || ''))
      );
    });
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    const serviceName = this.cities.map((city: any) => city.name);
    return serviceName.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getValueCity(city_id: number) {
    this.doctorService.filteredNeighbor(city_id).subscribe(res => {
      this.neighborhood = res.data;
      this.filteredNeighborhood = this.neighborhoodForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filteredNeighbor(value || ''))
      );
    });
  }

  _filteredNeighbor(value: string): string[] {
    const filterValue = value.toLowerCase();
    const neighborName = this.neighborhood.map(
      (neighbor: any) => neighbor.name
    );
    return neighborName.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getAllInsurances() {
    this.doctorService.getAllInsurances().subscribe((res: any) => {
      console.log(res.data); // Check the structure of the response
      this.insurances = res.data;
      this.filteredInsurance = this.insuranceForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filterInsurance(value || ''))
      );
    });
  }

  _filterInsurance(value: string): string[] {
    const filterValue = value.toLowerCase();
    const insuranceName = this.insurances.map((name: any) => name.name);
    return insuranceName.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  restForm(): void {
    this.neighborhoodForm.reset();
    this.cityForm.reset();
  }

  getValueSpecialty(option: string) {
    this.valueOfSpeciality = option;
    this.onChangeValueInput.emit(option);
  }

  deleteFilter(value: string) {
    this.valueOfSpeciality = '';
    this.myControl.reset();
    this.onDeleteValue.emit(value);
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
