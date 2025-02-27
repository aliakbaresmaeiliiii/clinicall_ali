import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DoctorsService } from '../../../../modules/doctors/services/doctors.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
export interface FilerValue {
  id: number;
  name: string;
}
@Component({
  selector: 'generic-tab',
  standalone: false,

  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabComponent
  extends BaseComponent
  implements AfterViewInit, AfterContentInit
{
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
  cityForm = new FormControl('');
  insuranceForm = new FormControl('');
  specialties: string[] = [];
  clinicServices: string[] = [];
  cities: string[] = [];
  insurances: string[] = [];
  neighborhood: string[] = [];
  filteredSpeciality!: Observable<FilerValue[]>;
  filteredServices!: Observable<FilerValue[]>;
  filteredCity!: Observable<FilerValue[]>;
  filteredNeighborhood!: Observable<FilerValue[]>;
  filteredInsurance!: Observable<FilerValue[]>;
  doctorService = inject(DoctorsService);
  activeFilter = 0;
  tabTitle = output<string>();
  onChangeValueInput = output<{ name: string; id: any } | any>();

  onDeleteValue = output<string>();
  valueFiltering: string = '';

  form = this.fb.group({
    city: [''],
    neighborhoodForm: [''],
    speciality: [''],
    services: [''],
    insurance: [''],
  });

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

  ngOnInit() {
    this.getSpecialties();
    this.fetchServices();
    this.getAllCities();
    this.getAllInsurances();
  }

  getSpecialties() {
    this.doctorService.getSpecialties().subscribe((data: any) => {
      this.specialties = data.data;
      this.filteredSpeciality = this.form.controls.speciality.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSpeciality(value || ''))
      );
    });
  }
  _filterSpeciality(value: string): FilerValue[] {
    const filterValue = value.toLowerCase();
    return this.specialties
      .filter((specialtie: any) =>
        specialtie.name.toLowerCase().includes(filterValue)
      )
      .map((specialtie: any) => ({
        name: specialtie.name,
        id: specialtie.id,
      }));
  }

  handleInputChange(mode: string, valueOption: { name: string; id: number }) {
    this.valueFiltering = valueOption.name;
    const id = valueOption.id;
    const payloadSpeciality = {
      specialty_id: id,
    };
    const payloadServices = {
      service_id: id,
    };
    const cityServices = {
      city_id: id,
    };
    switch (mode) {
      case 'speciality':
        this.onChangeValueInput.emit(payloadSpeciality);
        break;
      case 'services':
        this.onChangeValueInput.emit(payloadServices);
        break;
      case 'city':
        this.onChangeValueInput.emit(cityServices);
        this.fetchNeighborhood(cityServices.city_id);
        break;

      default:
        break;
    }
  }

  // getValueChange(option: FilerValue) {
  //   this.valueFiltering = option.name;
  // }

  fetchServices() {
    this.doctorService.fetchServices().subscribe(res => {
      this.clinicServices = res.data;
      this.filteredServices = this.form.controls.services.valueChanges.pipe(
        startWith(''),
        map(value => this._filterServices(value || ''))
      );
    });
  }

  _filterServices(value: string): FilerValue[] {
    const filterValue = value.toLowerCase();
    return this.clinicServices
      .filter((service: any) =>
        service.name.toLowerCase().includes(filterValue)
      )
      .map((service: any) => ({
        name: service.name,
        id: service.id,
      }));
  }

  // getValueService(option: FilerValue) {
  //   this.valueFiltering = option.name;
  // }
  // getValueCity(option: FilerValue) {
  //   this.valueFiltering = option.name;
  // }

  getAllCities() {
    this.doctorService.getAllCities().subscribe(res => {
      this.cities = res.data;
      this.filteredCity = this.form.controls.city.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCities(value || ''))
      );
    });
  }

  _filterCities(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.cities
      .filter((city: any) => city.name.toLowerCase().includes(filterValue))
      .map((city: any) => ({
        name: city.name,
        id: city.id,
      }));
  }

  fetchNeighborhood(city_id: number) {
    this.doctorService.filteredNeighbor(city_id).subscribe(res => {
      this.neighborhood = res.data;
      this.filteredNeighborhood =
        this.form.controls.neighborhoodForm.valueChanges.pipe(
          startWith(''),
          map(value => this._filterNeighbore(value || ''))
        );
    });
  }

  _filterNeighbore(value: string): FilerValue[] {
    const filterValue = value.toLowerCase();
    return this.neighborhood
      .filter((neighborhood: any) =>
        neighborhood.name.toLowerCase().includes(filterValue)
      )
      .map((neighborhood: any) => ({
        name: neighborhood.name,
        id: neighborhood.id,
      }));
  }
  getValueNeighborhood(option: FilerValue) {
    const getValueFilter = option.name;
    this.valueFiltering = getValueFilter;
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

  getValueInsurance(option: FilerValue) {
    const getValueFilter = option.name;
    this.valueFiltering = getValueFilter;
  }

  _filterInsurance(value: string): FilerValue[] {
    const filterValue = value.toLowerCase();
    return this.insurances
      .filter((insure: any) => insure.name.toLowerCase().includes(filterValue))
      .map((i: any) => ({
        name: i.name,
        id: i.id,
      }));
  }

  restForm(): void {
    this.form.controls.neighborhoodForm.reset();
    this.cityForm.reset();
  }

  ngAfterContentInit(): void {}
  deleteFilter(index: string) {
    this.valueFiltering = '';
    this.form.reset();
    this.onDeleteValue.emit(index);
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

  setSelectedTab(index: number) {
    const selectedTab = this.tabs()[index];
    this.selectedTemplate = selectedTab.template;
    this.context = { $implicit: selectedTab.context };
  }

  setActiveFilter(tab: any) {
    this.activeFilter = tab.key;
    this.tabTitle.emit(tab);
  }

  get neighborhoodForm() {
    return this.form.get('neighborhoodForm');
  }
}
