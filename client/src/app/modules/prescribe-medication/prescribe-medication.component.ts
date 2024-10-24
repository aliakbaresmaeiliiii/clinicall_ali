import {
  Component,
  inject,
  makeStateKey,
  OnDestroy,
  OnInit,
  TemplateRef,
  TransferState,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '../../shared/components/base/base.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { ShareService } from '../../shared/services/share.service';
import { Diseases, SubCategoryDisease } from '../patients/model/disease';
import { PatientDTO } from '../patients/model/patients.model';
import { PatientsService } from '../patients/services/patients.service';
import { IsFavorite } from './enum/isFavorite.enum';
import { Medicine } from './medicine';
import { PrescribeMedicationService } from './services/prescribe-medication.service';

@Component({
  selector: 'app-prescribe-medication',
  templateUrl: './prescribe-medication.component.html',
  styleUrl: './prescribe-medication.component.scss',
})
export class PrescribeMedicationComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  shareService = inject(ShareService);
  agePipe = inject(AgePipe);
  service = inject(PatientsService);
  prescribeService = inject(PrescribeMedicationService);
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Male', 'Female'];
  maritalStatus: string[] = ['Single', 'Married'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  sugarLevels: string[] = ['Normal', 'Prediabetes', 'Diabetes'];
  @ViewChild('templateOne', { static: true }) templateOne!: TemplateRef<any>;
  @ViewChild('templateTwo', { static: true }) templateTwo!: TemplateRef<any>;
  @ViewChild('templateThree', { static: true })
  templateThree!: TemplateRef<any>;
  #route = inject(ActivatedRoute);

  @ViewChild('templatefour', { static: true }) templatefour!: TemplateRef<any>;
  tabs: {
    id: number;
    title: string;
    template: TemplateRef<any>;
    context?: any;
  }[] = [];
  title = 'Patient Information';
  profileImg: File | null = null;
  textDirection: 'ltr' | 'rtl' = 'ltr';
  phoneExists: boolean | null | unknown = null;
  maxDate!: Date;
  minDate!: Date;
  transferState = inject(TransferState);
  DATA_KEY_PATIENT = makeStateKey<any>('pateintInfo');
  DATA_KEY_MEDIC = makeStateKey<any>('medicine');
  DATA_KEY_DISEASES = makeStateKey<any>('disease');
  DATA_KEY_SUB_CATEGPRY_DISEASE = makeStateKey<any>('subCategoryDisease');
  isSelectDisease = true;
  isSelectedSubCategory = true;
  severityData = [
    { value: 'mid', viewValue: 'Mid' },
    { value: 'moderate', viewValue: 'Moderate' },
    { value: 'severe', viewValue: 'Severe' },
  ];
  dosage = [
    { value: '10mg', viewValue: '10 mg' },
    { value: '20mg', viewValue: '20mg' },
    { value: '50mg', viewValue: '50mg' },
    { value: '100mg', viewValue: '100mg' },
  ];
  durationOption = [
    { value: '1day', viewValue: '1day' },
    { value: '1week', viewValue: '1week' },
    { value: '1months', viewValue: '1months' },
    { value: '3months', viewValue: '3months' },
    { value: '6months', viewValue: '6months' },
  ];
  frequencyOptions = [
    { value: 'once', viewValue: 'Once' },
    { value: 'daily', viewValue: 'Daily' },
    { value: 'weekly', viewValue: 'Weekly' },
    { value: 'bi-weekly', viewValue: 'Bi-Weekly' },
    { value: 'monthly', viewValue: 'Monthly' },
    { value: 'custom', viewValue: 'Other' },
  ];
  selectedPatient: string = '';
  selectedMedicine: any = '';
  selectedDiseases: string = '';
  selectedSubCategoriesDisease: string = '';
  private destroy$ = new Subject<void>();
  medicData: Medicine[] = [];
  patientInfo: PatientDTO[] = [];
  diseaseData: Diseases[] = [];
  subCategoryDiseaseData: SubCategoryDisease[] = [];
  filteredPatient: any;
  filteredMedicine: any;
  filteredDiseases: any;
  filterMedicData!: Medicine[];
  filteredSubCategoriesDisease: any;

  storeMedicine: any[] = [];

  form = this.fb.group({
    patientName: ['', Validators.required],
    bloodGroup: [''],
    bloodPressure: [''],
    haemoglobin: [''],
    mobile: [''],
    sugarLevel: [''],
    description: [''],
    searchFood: [''],
    dateOfBirth: ['', Validators.required],
    diseasesGroup: this.fb.group({
      diseases: [''],
      diseaseSubcategories: [''],
      severity: [''],
      prescription_date: [new Date()],
    }),
    medication: this.fb.group({
      medicine: [''],
      duration: [''],
      frequency: [this.frequencyOptions[0].value], // Default to 'Once'
      customFrequency: [''],
    }),
  });

  onFrequencyChange(event: any) {
    const selectedFrequency = event.value;
    if (selectedFrequency !== 'custom') {
      this.form.controls.medication.get('customFrequency')?.setValue('');
    }
  }

  ngOnInit() {
    this.fetchDisease();
    this.fetchMedicine();
    this.fetchPatients();
    this.filterDiseases();
    this.#route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {});
    this.setDataInTabs();
  }

  setDataInTabs() {
    this.tabs = [
      {
        id: 0,
        title: 'Patient Info',
        template: this.templateOne,
        context: { data: 'Data for Tab 1' },
      },
      {
        id: 1,
        title: 'Prescription Medicine',
        template: this.templateTwo,
        context: { data: 'Data for Tab 2' },
      },
    ];
  }

  handleTabChange(index: number) {}

  filterPatient() {
    const filterValue = this.form.get('searchFood')?.value?.toLowerCase() || '';
    this.filteredPatient = this.patientInfo.filter(p =>
      p.firstName?.toLowerCase().includes(filterValue)
    );
  }
  fetchPatients() {
    const cachedData = this.transferState.get(this.DATA_KEY_PATIENT, null);
    if (!cachedData) {
      this.service.getPatients().subscribe((response: any) => {
        if (response && response.data) {
          this.filteredPatient = [...response.data];
          this.transferState.set(this.DATA_KEY_PATIENT, response.data);
        }
      });
    } else {
      this.patientInfo = cachedData;
      this.selectedPatient = cachedData;
      this.transferState.remove(this.DATA_KEY_PATIENT);
    }
  }
  filterMedicine() {
    const filterValue =
      this.form.get('medication.medicine')?.value?.toLowerCase() || '';
    this.filteredMedicine = this.medicData.filter(p =>
      p.medicine_name?.toLowerCase().includes(filterValue)
    );
  }
  filterDiseases() {
    const filterValue =
      this.form.get('diseasesGroup.diseases')?.value?.toLowerCase() || '';
    if (this.diseaseData && this.diseaseData.length) {
      this.filteredDiseases = this.diseaseData.filter(p =>
        p.disease_name?.toLowerCase().includes(filterValue)
      );
    }
  }
  filterSubCategoriesDisease() {
    const filterValue =
      this.form
        .get('diseasesGroup.diseaseSubcategories')
        ?.value?.toLowerCase() || '';
    if (this.subCategoryDiseaseData && this.subCategoryDiseaseData.length) {
      this.filteredSubCategoriesDisease = this.subCategoryDiseaseData.filter(
        p => p.subcategory_name?.toLowerCase().includes(filterValue)
      );
    }
  }
  fetchMedicine() {
    const cachedData = this.transferState.get(this.DATA_KEY_MEDIC, null);
    if (!cachedData) {
      this.prescribeService.getDrugData().subscribe((response: any) => {
        if (response && response.data) {
          const mappedData = response.data
            .map((item: any) => {
              const isFavoriteValue = item.isFavorite; // Capture the original value for debugging
              const isFavorite = isFavoriteValue === IsFavorite.True;

              console.log(
                `Item: ${item.name}, isFavorite: ${isFavoriteValue}, Mapped: ${isFavorite}`
              ); // Log each item's conversion

              return {
                ...item,
                isFavorite, // Convert 0 to false and 1 to true
              };
            })
            .sort((a: any, b: any) => {
              return b.isFavorite - a.isFavorite;
            });
          console.log('Mapped Data:', mappedData);
          this.filterMedicData = [...mappedData];
          this.transferState.set(this.DATA_KEY_MEDIC, mappedData);
        }
      });
    } else {
      this.medicData = cachedData;
      this.selectedMedicine = [...cachedData];
      this.transferState.remove(this.DATA_KEY_MEDIC);
    }
  }
  fetchDisease() {
    const cachedData = this.transferState.get(this.DATA_KEY_DISEASES, null);
    if (!cachedData) {
      this.prescribeService.getDiseases().subscribe((response: any) => {
        if (response && response.data) {
          this.diseaseData = [...response.data]; // Store the original data
          this.filteredDiseases = [...response.data]; // Apply the same data to the filtered list
          this.transferState.set(this.DATA_KEY_DISEASES, response.data); // Cache the data
        }
      });
    } else {
      this.diseaseData = cachedData;
      this.filteredDiseases = [...cachedData];
      this.transferState.remove(this.DATA_KEY_DISEASES);
    }
  }
  getDiseases() {
    this.prescribeService.getDiseases().subscribe(res => {});
  }
  ngAfterViewInit(): void {
    this.shareService.getStoreProfileImg$.subscribe(res => {
      this.profileImg = res;
      this.shareService.setLoading(false);
    });
  }
  onSelectedChange(patientName: PatientDTO) {
    this.selectedPatient = patientName.firstName + ' ' + patientName.lastName;
    if (this.selectedPatient) {
      const formattedDate = new Date(patientName.dateOfBirth)
        .toISOString()
        .split('T')[0];
      this.dateOfBirth?.setValue(formattedDate);
      this.bloodGroup?.setValue(patientName.bloodGroup);
      this.bloodPressure?.setValue(patientName.bloodPressure);
      this.haemoglobin?.setValue(patientName.haemoglobin);
      this.mobile?.setValue(patientName.mobile);
      this.sugarLevel?.setValue(patientName.sugarLevel);
      this.description?.setValue(patientName.description);
    }
  }
  onSelectedChangeMedic(medic: string) {}
  onSelectedChangeDiseases(disease_id: string) {
    this.fetchSubCategoryDisease(disease_id);
    if (disease_id) {
      this.isSelectDisease = false;
    } else {
      this.isSelectDisease = true;
    }
  }

  onSelectedChangeSubCat(data: Diseases) {
    if (data.disease_id) {
      this.isSelectedSubCategory = false;
    }
  }
  fetchSubCategoryDisease(disease_id: string) {
    const cachedData = this.transferState.get(
      this.DATA_KEY_SUB_CATEGPRY_DISEASE,
      null
    );
    if (!cachedData) {
      this.prescribeService
        .getDiseaseSubcategories(disease_id)
        .subscribe((response: any) => {
          if (response && response.data) {
            this.subCategoryDiseaseData = [...response.data]; // Store the original data
            this.filteredSubCategoriesDisease = [...response.data]; // Apply the same data to the filtered list
            this.transferState.set(
              this.DATA_KEY_SUB_CATEGPRY_DISEASE,
              response.data
            ); // Cache the data
          }
        });
    } else {
      this.subCategoryDiseaseData = cachedData;
      this.filteredSubCategoriesDisease = [...cachedData]; // Set both to cached data
      this.transferState.remove(this.DATA_KEY_SUB_CATEGPRY_DISEASE); // Optionally clear the cache
    }
  }
  toggleDirection() {
    this.textDirection = this.textDirection === 'ltr' ? 'rtl' : 'ltr';
  }
  displayWithFn(drug: any) {
    return drug.medicine_name;
  }
  onSubmit(formData: any) {
    console.log('this.form.value', this.form.value);
    this.storeMedicine.push(formData);
    // this.storeMedicine
    // if (this.profileImg) {
    //   const imgProfile = this.profileImg;
    //   const payload: DoctorsDTO = {
    //     name: this.form.value.name,
    //     gender: this.form.value.gender,
    //     mobile: this.form.value.mobile,
    //     specialization: this.form.value.specialization,
    //     dateOfBirth: this.form.value.dateOfBirth,
    //     address: this.form.value.address,
    //     department: this.form.value.department,
    //     degree: this.form.value.degree,
    //     email: this.form.value.email,
    //     age: this.form.value.age,
    //     profileImage: imgProfile.name,
    //   };
    //   this.service.addDoctor(payload).subscribe((res: any) => {
    //     if (res.code === 200) {
    //       this.form.reset();
    //       this.toastrService.success('pateint add successfully');
    //     } else {
    //       this.toastrService.error('can not add patient...!');
    //     }
    //   });
    // }
  }
  deleteMedicine() {
    this.storeMedicine = [];
  }
  onSelectionChanged(value: unknown) {}
  onSearchChanged(queryString: string) {
    this.fetchMedicine();
    this.filterMedicData = this.medicData.filter(d =>
      d.medicine_name?.toLowerCase().startsWith(queryString.toLowerCase())
    );
  }
  compareWithFn(medicine_name: any | null, medicine_name2: any | null) {
    return medicine_name?.id === medicine_name2.id;
  }
  selectedFavorite(user: Medicine) {
    user.isFavorite = !user.isFavorite;
    this.prescribeService.updateIsFavorite(user.id, user.isFavorite).subscribe(
      res => {
        console.log('Favorite status updated successfully:', res);
      },
      error => {
        console.error('Error updating favorite status:', error);
        user.isFavorite = !user.isFavorite; // Revert to previous state
      }
    );
  }

  onRemove(e: any) {}

  trackByFn() {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get patientName() {
    return this.form.get('patientName');
  }
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
  get bloodGroup() {
    return this.form.get('bloodGroup');
  }
  get bloodPressure() {
    return this.form.get('bloodPressure');
  }
  get haemoglobin() {
    return this.form.get('haemoglobin');
  }
  get mobile() {
    return this.form.get('mobile');
  }
  get sugarLevel() {
    return this.form.get('sugarLevel');
  }
  get description() {
    return this.form.get('description');
  }
  get frequency() {
    return this.form.get('frequency');
  }
}
