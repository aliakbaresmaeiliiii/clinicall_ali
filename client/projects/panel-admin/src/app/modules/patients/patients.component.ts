import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  inject,
  Input,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../../shared/components/base/base.component';
import { AddUserInfoDialogComponent } from '../users/components/add-user-info-dialog/add-user-info-dialog.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DeletePatientDialogComponent } from './delete-patient-dialog/delete-patient-dialog.component';
import { EditPatientDialogComponent } from './edit-patient-dialog/edit-patient-dialog.component';
import { PatientDTO } from './model/patients.model';
import { PatientsService } from './services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss',
})
export class PatientsComponent extends BaseComponent {
  service = inject(PatientsService);
  displayedColumns: string[] = [
    'select',
    'id',
    'profileImage',
    'name',
    'gender',
    'mobile',
    'dateOfBirth',
    'age',
    'email',
    // 'maritalStatus',
    'address',
    // 'bloodGroup',
    // 'bloodPressure',
    // 'sugarLevel',
    // 'injury',
    'action',
  ];
  dataSource = new MatTableDataSource<PatientDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() title!: string;
  selection = new SelectionModel<any>(true, []);
  imgPatient: any;
  imgTest: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getData() {
    this.service.getPatients().subscribe((response: any) => {
      const newData = response.data.map((patient: any) => {
        patient.profileImage = patient.profileImage
          ? `${environment.urlProfileImg}${patient.profileImage}`
          : '../../../assets/images/bg-01.png';
        return patient;
      });
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: PatientDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  addUserInfo() {
    this.dialog.open(AddUserInfoDialogComponent, {
      height: '900px',
    });
  }

  addPateint(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  patientDetial(id: number) {
    this.router.navigate(['aliakbar/patients/patient-detail', id]);
  }

  refreshGrid() {
    this.getData();
  }

  export() {
    const data = this.dataSource.data;
    const aoaData: any[][] = [
      [
        'id',
        'Name',
        'Gender',
        'Mobile',
        'dateOfBirth',
        'Age',
        'Email',
        'Address',
      ],
      ...data.map(item => [
        item.id,
        item.firstName + ' ' + item.lastName,
        item.gender,
        item.mobile,
        item.dateOfBirth,
        item.age,
        item.email,
        item.address,
      ]), // Adjust fields as per your PatientDTO
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoaData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  editPatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(EditPatientDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  deletePatient(
    row: PatientDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DeletePatientDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
  ngOnDestroy(): void {}
}
