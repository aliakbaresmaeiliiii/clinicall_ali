import { CommonModule } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddUserInfoDialogComponent } from '../../../users/components/add-user-info-dialog/add-user-info-dialog.component';
import { FilterComponent } from '../../../users/filter/filter.component';
import { Customers } from '../../../users/models/customers';
import { CustomersService } from '../../../users/services/customers.service';

@Component({
    selector: 'app-doctor-list',
    templateUrl: './doctor-list.component.html',
    styleUrl: './doctor-list.component.scss',
    standalone: false
})
export class DoctorListComponent {
  customers: Customers[] = [];
  displayedColumns: string[] = ['position', 'doctorName', 'status'];
  dataSource = new MatTableDataSource();
  // readonly paginator = viewChild.required(MatPaginator);
  // readonly sort = viewChild.required(MatSort);
  readonly title = input.required<string>();


  constructor( private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator();
    // this.dataSource.sort = this.sort();
  }

  /**
   * This is the get function
   * @returns returns array of UserData
   */
  getData() {
    // this.service
    //   .getCustomers()
    //   .pipe(take(1))
    //   .subscribe((data: any) => {
    //     this.dataSource = new MatTableDataSource(data.data);
    //     this.dataSource.sort = this.sort;
    //     // this.customers = data.data;
    //   });
  }

  /**
   * This is the get function
   * @param event This is the applyFilter
   * @returns returns datauser with filter
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {}

  addUserInfo() {
    this.dialog.open(AddUserInfoDialogComponent, {
      height: '900px',
    });
  }
}
