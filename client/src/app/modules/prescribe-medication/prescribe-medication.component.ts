import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  makeStateKey,
  OnInit,
  TransferState,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../../shared/components/base/base.component';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { ShareService } from '../../shared/services/share.service';
import { PatientsService } from '../patients/services/patients.service';
import { PrescribeMedicationService } from './services/prescribe-medication.service';
import { Medicine } from './medicine';
import { PatientDTO } from '../patients/model/patients.model';
import { Diseases, SubCategoryDisease } from '../patients/model/disease';

@Component({
  selector: 'app-prescribe-medication',
  templateUrl: './prescribe-medication.component.html',
  styleUrl: './prescribe-medication.component.scss',
})
export class PrescribeMedicationComponent
  extends BaseComponent
  implements OnInit
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
  isSelectedDiseases = false;
  foods = [
    { value: 'pizza', viewValue: 'Pizza' },
    { value: 'burger', viewValue: 'Burger' },
    { value: 'steak', viewValue: 'Steak' },
    { value: 'salad', viewValue: 'Salad' },
  ];
  selectedPatient: string = '';
  selectedMedicine: any = '';
  selectedDiseases: string = '';
  selectedSubCategoriesDisease: string = '';

  medicData: Medicine[] = [];
  patientInfo: PatientDTO[] = [];
  diseaseData: Diseases[] = [];
  subCategoryDiseaseData: SubCategoryDisease[] = [];
  filteredPatient: any;
  filteredMedicine: any;
  filteredDiseases: any;
  filterMedicData!: Medicine[];

  filteredSubCategoriesDisease: any;
  form = this.fb.group({
    patientName: ['', Validators.required],
    dateOfBirth: [''],
    bloodGroup: [''],
    bloodPressure: [''],
    haemoglobin: [''],
    mobile: [''],
    sugarLevel: [''],
    description: [''],
    searchFood: [''],
    medicine: [''],
    diseases: [''],
    diseaseSubcategories: [''],
  });

  ngOnInit() {
    this.fetchDisease();
    this.fetchMedicine();
    this.fetchPatients();
    this.filterDiseases();
  }

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
    const filterValue = this.form.get('medicine')?.value?.toLowerCase() || '';
    this.filteredMedicine = this.medicData.filter(p =>
      p.drug_name?.toLowerCase().includes(filterValue)
    );
  }
  filterDiseases() {
    const filterValue = this.form.get('diseases')?.value?.toLowerCase() || '';
    if (this.diseaseData && this.diseaseData.length) {
      this.filteredDiseases = this.diseaseData.filter(p =>
        p.disease_name?.toLowerCase().includes(filterValue)
      );
    }
  }
  filterSubCategoriesDisease() {
    const filterValue =
      this.form.get('diseaseSubcategories')?.value?.toLowerCase() || '';
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
          this.filterMedicData = [...response.data];
          this.transferState.set(this.DATA_KEY_MEDIC, response.data);
        }
      });
    } else {
      this.medicData = cachedData;
      this.selectedMedicine = [...cachedData];
      this.transferState.remove(this.DATA_KEY_MEDIC);
    }
    // this.prescribeService.getDrugData().subscribe(res => {
    //   // this.medicData = res.result;
    //   this.filterMedicData = [...this.patientInfo];

    // });
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
    this.isSelectedDiseases = true;
    this.fetchSubCategoryDisease(disease_id);
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
    return drug.drug_name;
  }
  onSubmit() {
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
  onSelectionChanged(value: unknown) {}
  onSearchChanged(queryString: string) {
    this.fetchMedicine();
    this.filterMedicData = this.medicData.filter(d =>
      d.drug_name?.toLowerCase().startsWith(queryString.toLowerCase())
    );
  }
  compareWithFn(drug_name: any | null, drug_name2: any | null) {
    return drug_name?.id === drug_name2.id;
  }
  selectedFavorite(user: Medicine) {
    user.isFavorite = !user.isFavorite;
    debugger;
    this.prescribeService.updateIsFavorite(user.id, user.isFavorite).subscribe(
      res => {
        console.log('Favorite status updated successfully:', res);
      },
      error => {
        console.error('Error updating favorite status:', error);
        user.isFavorite = !user.isFavorite; // Revert to previous state
      }
    );

    debugger;
  }

  onRemove(e: any) {}

  trackByFn() {}

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
  get searchFood() {
    return this.form.get('searchFood');
  }
}
