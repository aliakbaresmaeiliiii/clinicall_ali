import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Customers } from '../../models/customers';
import { CustomersService } from '../../services/customers.service';
import { AddUserInfoDialogComponent } from '../add-user-info-dialog/add-user-info-dialog.component';

@Component({
    selector: 'app-user-list',
    imports: [
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
    ],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnDestroy, OnInit {
  customers: Customers[] = [];
  displayedColumns: string[] = [
    'position',
    'customer_id',
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'address',
    'city',
    'state',
    'zip_code',
  ];
  dataSource = new MatTableDataSource();
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  constructor(private service: CustomersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
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
