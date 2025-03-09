import { Component, inject, OnInit, viewChild } from '@angular/core';
import { CalendarService } from '../../../../modules/calendar/services/calendar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { EditDoctorComponent } from '../../../../modules/doctors/components/edit-doctor/edit-doctor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-appointments',
  standalone: false,
  templateUrl: './user-appointments.component.html',
  styleUrl: './user-appointments.component.scss',
})
export class UserAppointmentsComponent implements OnInit {
  calendarService = inject(CalendarService);
  dataSource = new MatTableDataSource();
  readonly sort = viewChild.required(MatSort);
  selection = new SelectionModel<any>(true, []);
  tooltipVisibility = 'View Detail';

  displayedColumns: string[] = [
    'select',
    'position',
    'doctor_name',
    'appointment_date',
    'appointment_time',
    'arrival_time',
    'status',
    'action',
  ];
  readonly paginator = viewChild.required(MatPaginator);
  dialog = inject(MatDialog);

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator();
    // this.dataSource.sort = this.sort();
  }

  ngOnInit(): void {
    this.fetchAppointmentData();
  }

  fetchAppointmentData() {
    this.calendarService.getAppointmentData().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
      console.log(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
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

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  doctorDetial(data: any) {}

  editDoctor(
    row: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(EditDoctorComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  deleteDoctor(
    row: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(EditDoctorComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
