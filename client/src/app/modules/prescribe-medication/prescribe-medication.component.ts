import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  makeStateKey,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  TransferState,
  ViewChild,
} from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '../../shared/components/base/base.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { ShareService } from '../../shared/services/share.service';
import { Diseases, SubCategoryDisease } from '../patients/model/disease';
import { PatientDTO } from '../patients/model/patients.model';
import { PatientsService } from '../patients/services/patients.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { IsFavorite } from './enum/isFavorite.enum';
import { Medicine } from './medicine';
import { PrescribeMedicationService } from './services/prescribe-medication.service';
import { Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { PrescriptionMedicine } from './models/prescribe-medication';

@Component({
  selector: 'app-prescribe-medication',
  templateUrl: './prescribe-medication.component.html',
  styleUrl: './prescribe-medication.component.scss',
})
export class PrescribeMedicationComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  title = signal('Patient Information');

  formDataTab1: any[] = [];
  formDataTab2: any[] = [];

  shareService = inject(ShareService);
  agePipe = inject(AgePipe);
  service = inject(PatientsService);
  prescribeService = inject(PrescribeMedicationService);
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Male', 'Female'];
  maritalStatus: string[] = ['Single', 'Married'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  sugarLevels: string[] = ['Normal', 'Prediabetes', 'Diabetes'];
  patientId!: number;
  #route = inject(ActivatedRoute);
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('templatefour', { static: true }) templatefour!: TemplateRef<any>;
  tabs: {
    id: number;
    title: string;
    template: TemplateRef<any>;
    context?: any;
    disabled: boolean;
  }[] = [];
  // title = 'Patient Information';
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
  loadingCards = new Array(3);
  storeMedicine: any[] = [];
  selectedIndex: number = 0;

  form = this.fb.group({
    patientInfo: this.fb.group({
      patientName: ['', Validators.required],
      bloodGroup: [''],
      bloodPressure: [''],
      haemoglobin: [''],
      mobile: [''],
      sugarLevel: [''],
      dateOfBirth: [''],
      diseases: [''],
      diseaseSubcategories: [''],
      severity: [''],
    }),

    medication: this.fb.group({
      medicine: ['', Validators.required],
      duration: [''],
      frequency: [this.frequencyOptions[0].value], // Default to 'Once'
      customFrequency: [''],
      prescribed_date: [new Date()],
      description: [''],
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
  }

  onTabChanged(formData: any) {
    // this.updateTabStatus();
  }

  // updateTabStatus() {
  //   if (this.form.controls.patientInfo) {
  //     this.tabs[1].disabled = false;
  //     this.form.controls.medication.valueChanges.subscribe(res => {
  //       if (res) {
  //         this.tabs[2].disabled = false;
  //       }
  //     });
  //   } else {
  //   }
  // }

  goToNextTab() {
    this.formDataTab1.push(this.form.controls.patientInfo.value);
    console.log(this.formDataTab1);

    this.selectedIndex++;
  }

  previoseTab() {
    this.selectedIndex--;
  }

  filterPatient() {
    const filterValue =
      this.form.get('patientInfo.patientName')?.value?.toLowerCase() || '';
    this.filteredPatient = this.patientInfo.filter(p =>
      p.patientName?.toLowerCase().includes(filterValue)
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
      p.name?.toLowerCase().includes(filterValue)
    );
  }
  filterDiseases() {
    const filterValue =
      this.form.get('patientInfo.diseases')?.value?.toLowerCase() || '';
    if (this.diseaseData && this.diseaseData.length) {
      this.filteredDiseases = this.diseaseData.filter(p =>
        p.name?.toLowerCase().includes(filterValue)
      );
    }
  }
  filterSubCategoriesDisease() {
    const filterValue =
      this.form.get('patientInfo.diseaseSubcategories')?.value?.toLowerCase() ||
      '';
    if (this.subCategoryDiseaseData && this.subCategoryDiseaseData.length) {
      this.filteredSubCategoriesDisease = this.subCategoryDiseaseData.filter(
        p => p.name?.toLowerCase().includes(filterValue)
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
              const isFavoriteValue = item.isFavorite;
              const isFavorite = isFavoriteValue === IsFavorite.True;
              return {
                ...item,
                isFavorite,
              };
            })
            .sort((a: any, b: any) => {
              return b.isFavorite - a.isFavorite;
            });
          this.filterMedicData = [...mappedData];
          console.log('this.filterMedicData', this.filterMedicData);
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
  onSelectedChange(patienData: PatientDTO) {
    this.patientId = patienData.patient_id;
    const formattedDate = new Date(patienData.dateOfBirth)
      .toISOString()
      .split('T')[0];
    this.dateOfBirth?.setValue(formattedDate);
    this.bloodGroup?.setValue(patienData.bloodGroup);
    this.bloodPressure?.setValue(patienData.bloodPressure);
    this.haemoglobin?.setValue(patienData.haemoglobin);
    this.mobile?.setValue(patienData.mobile);
    this.sugarLevel?.setValue(patienData.sugarLevel);
    this.description?.setValue(patienData.description);
    // this.patienData?.setValue(this.selectedPatient);
    this.diseases?.setValue(patienData.diseases);
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

  onSelectedChangeSubCat(data: any) {
    if (data.disease_id) {
      this.isSelectedSubCategory = false;
    }
    // this.diseases?.setValue(data.disease_name);
    this.diseaseSubcategories?.setValue(data.subcategory_name);
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
  displayWithFn(medication: Medicine) {
    return medication.name;
  }

  storeDataTab2(formData: any) {
    this.formDataTab2.push(this.form.controls.medication.value);
    console.log(this.formDataTab2);
  }
  onSubmit(form: any) {
    this.storeMedicine.push(form);
    const medicine = this.form.controls.medication.value;
    const payload: PrescriptionMedicine = {
      patient_id: this.patientId,
      medicine_name: medicine.medicine,
      duration: medicine.duration,
      instructions: medicine.customFrequency,
      frequency: medicine.frequency,
      prescribed_date: medicine.prescribed_date,
    };
    this.prescribeService.addPrescriptionMedicne(payload).subscribe((res)=>{

    });
  }
  deleteMedicine(index: any) {
    this.storeMedicine.splice(index, 1);
  }

  onSearchChanged(queryString: string) {
    this.fetchMedicine();
    this.filterMedicData = this.medicData.filter(d =>
      d.name?.toLowerCase().startsWith(queryString.toLowerCase())
    );
  }

  compareWithFn(medic: Medicine | null, medic2: Medicine | null) {
    return medic?.medication_id === medic2?.medication_id;
  }

  selectedFavorite(medic: Medicine) {
    medic.isFavorite = !medic.isFavorite;
    this.prescribeService
      .updateIsFavorite(medic.medication_id, medic.isFavorite)
      .subscribe(res => {
        console.log('Favorite status updated successfully:', res);
      });
  }

  onRemove(e: any) {}

  trackByFn() {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get patientName() {
    return this.form.get('patientInfo.patientName');
  }
  get dateOfBirth() {
    return this.form.get('patientInfo.dateOfBirth');
  }
  get bloodGroup() {
    return this.form.get('patientInfo.bloodGroup');
  }
  get bloodPressure() {
    return this.form.get('patientInfo.bloodPressure');
  }
  get haemoglobin() {
    return this.form.get('patientInfo.haemoglobin');
  }
  get mobile() {
    return this.form.get('patientInfo.mobile');
  }
  get sugarLevel() {
    return this.form.get('patientInfo.sugarLevel');
  }
  get diseases() {
    return this.form.get('patientInfo.diseases');
  }
  get description() {
    return this.form.get('medication.description');
  }
  get diseaseSubcategories() {
    return this.form.get('patientInfo.diseaseSubcategories');
  }
  get frequency() {
    return this.form.get('frequency');
  }
}
