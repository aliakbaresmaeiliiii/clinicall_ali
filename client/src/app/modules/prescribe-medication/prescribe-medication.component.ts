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
  medicService = inject(PrescribeMedicationService);
  labelUserName: string = 'UserName';
  labelPassword: string = 'password';
  matcher = new ErrorStateMatcher();
  genders: string[] = ['Male', 'Female'];
  maritalStatus: string[] = ['Single', 'Married'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  sugarLevels: string[] = ['Normal', 'Prediabetes', 'Diabetes'];
  title = 'Add New Patient';
  profileImg: File | null = null;
  textDirection: 'ltr' | 'rtl' = 'ltr';
  medicData: Medicine[] = [];
  phoneExists: boolean | null | unknown = null;
  maxDate!: Date;
  minDate!: Date;
  transferState = inject(TransferState);
  DATA_KEY = makeStateKey<any>('pateintInfo');

  patientInfo: PatientDTO[] = [];
  filterName: string[] = [];
  filteredPatient!: Observable<string[]>;

  form = this.fb.group({
    patientName: ['', Validators.required],
    dateOfBirth: [''],
    bloodGroup: [''],
    bloodPressure: [''],

    medicine: ['', Validators.required],

    age: [{ value: '', disabled: true }],

    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    specialization: ['', Validators.required],
    department: ['', Validators.required],
    degree: ['', Validators.required],
    selectValue: new FormControl<Medicine | null>(null),
  });

  ngOnInit() {
    // this.getDiseases();
    // this.getMedicine();
    this.fetchPatients();
    this.form
      .get('selectValue')
      ?.valueChanges.subscribe(this.onSelectionChanged);

    setTimeout(() => {
      this.filteredPatient = this.form.get('patientName')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    }, 100);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    const findName = this.patientInfo.map(name => name.firstName + ' ' + name.lastName);
    return findName.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getMedicine() {
    this.medicService.getDrugData().subscribe(res => {
      this.medicData = res.result;
    });
  }

  getDiseases() {
    this.medicService.getDiseases().subscribe(res => {});
  }

  ngAfterViewInit(): void {
    this.shareService.getStoreProfileImg$.subscribe(res => {
      this.profileImg = res;
      this.shareService.setLoading(false);
    });
  }

  fetchPatients() {
    const cachedData = this.transferState.get(this.DATA_KEY, null);
    if (!cachedData) {
      this.service.getPatients().subscribe((response: any) => {
        if (response && response.data) {
          this.patientInfo = response.data;
          (this.filterName = response.data.map(
            (patient: any) => patient.firstName + ' ' + patient.lastName
          )),
            this.transferState.set(this.DATA_KEY, response.data);
            debugger;
        }
      });
    } else {
      this.patientInfo = cachedData;
      this.filterName = cachedData.map((patient: any) => patient.firstName);
      this.transferState.remove(this.DATA_KEY);
    }
  }

  onSelectedChange(patientName: any) {
    const selectedPatient = this.patientInfo.find(
      (patient: any) => patient.firstName
    );
    console.log(selectedPatient);

    if (selectedPatient) {
      // const dateOfBirth = new Intl.DateTimeFormat('en-CA').format(new Date(selectedPatient.dateOfBirth));
      const formattedDate = new Date(selectedPatient.dateOfBirth)
        .toISOString()
        .split('T')[0];
      this.dateOfBirth?.setValue(formattedDate);
      this.bloodGroup?.setValue(selectedPatient.bloodGroup);
      this.bloodPressure?.setValue(selectedPatient.bloodPressure);
    }
    const patientId = selectedPatient?.id;
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

  filterMedicData: any;
  onSearchChanged(queryString: string) {
    this.filterMedicData = this.medicData.filter(d =>
      d.drug_name?.toLowerCase().startsWith(queryString.toLowerCase())
    );
  }
  compareWithFn(drug_name: any | null, drug_name2: any | null) {
    return drug_name?.id === drug_name2.id;
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

  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get mobile() {
    return this.form.get('mobile');
  }
  get address() {
    return this.form.get('address');
  }
  get specialization() {
    return this.form.get('specialization');
  }
  get department() {
    return this.form.get('department');
  }
  get degree() {
    return this.form.get('degree');
  }

  get medicine() {
    return this.form.get('medicine');
  }
}
