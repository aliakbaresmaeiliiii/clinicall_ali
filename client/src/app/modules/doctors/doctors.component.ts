import { Component, inject, input, viewChild } from '@angular/core';
import { DoctorsService } from './doctors.service';
import { DoctorsDTO } from './models/doctors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { environment } from '../../environments/environment';
import { BaseComponent } from '../../shared/components/base/base.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { PermissionService } from '../../core/services/permission.service';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.scss',
    standalone: false
})
export class DoctorsComponent extends BaseComponent {
  service = inject(DoctorsService);
  doctors: DoctorsDTO[] = [];
  displayedColumns: string[] = [
    'select',
    'doctor_id',
    'profileImage',
    'name',
    'gender',
    'mobile',
    'age',
    'email',
    // 'maritalStatus',
    // 'bloodGroup',
    // 'bloodPressure',
    // 'sugarLevel',
    // 'injury',
    'action',
  ];
  dataSource = new MatTableDataSource<DoctorsDTO>();
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);
  readonly title = input.required<string>();
  selection = new SelectionModel<any>(true, []);
  imgPatient: any;
  imgTest: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  hasAccess!: boolean;
  role: string = '';
  permissions: string[] = [];
  permissionService = inject(PermissionService);
  tooltipVisibility = 'View Detail';

  ngOnInit(): void {
    this.getData();
    this.hasAccess = this.permissionService.hasAllPermissions([
      'create',
      'edit',
      'delete',
    ]);
  
    // const userDataString = localStorage.getItem('userData');
    // if (userDataString) {
    //   const data = JSON.parse(userDataString).data;
    //   this.hasAccess = this.permisionService.canAccess(
    //     data[0].role_name,
    //     data.permission_name
    //   );
    // }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }
  getData() {
    this.service.getDoctors().subscribe((response: any) => {
      debugger;
      const newData = response.data.map((doctor: any) => {
        doctor.profileImage = doctor.profileImage
          ? `${environment.urlProfileImg}${doctor.profileImage}`
          : '../../../assets/images/bg-01.png';
        return doctor;
      });
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
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
  checkboxLabel(row?: DoctorsDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  addUserInfo() {
    // this.dialog.open(AddUserInfoDialogComponent, {
    //   height: '900px',
    // });
  }

  addPateint(enterAnimationDuration: string, exitAnimationDuration: string) {
    // const dialogRef = this.dialog.open(AddPatientComponent, {
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getData();
    // });
  }

  refreshGrid() {
    this.getData();
  }

  export() {
    // const data = this.dataSource.data;
    // const aoaData: any[][] = [
    //   [
    //     'id',
    //     'Name',
    //     'Gender',
    //     'Mobile',
    //     'dateOfBirth',
    //     'Age',
    //     'Email',
    //     'Address',
    //   ],
    //   ...data.map(item => [
    //     item.id,
    //     item.firstName + ' ' + item.lastName,
    //     item.gender,
    //     item.mobile,
    //     item.dateOfBirth,
    //     item.age,
    //     item.email,
    //     item.address,
    //   ]), // Adjust fields as per your PatientDTO
    // ];
    // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoaData);
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // /* save to file */
    // XLSX.writeFile(wb, this.fileName);
  }

  doctorDetial(doctor_id: number) {
    this.router.navigate(['aliakbar/doctors/doctor-detail', doctor_id]);
  }

  editDoctor(
    row: DoctorsDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(EditDoctorComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  deleteDoctor(
    row: DoctorsDTO,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    // const dialogRef = this.dialog.open(DeletePatientDialogComponent, {
    //   width: '250px',
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    //   data: row,
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getData();
    // });
  }
  ngOnDestroy(): void {}
}
