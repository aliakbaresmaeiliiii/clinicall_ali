import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddUserInfoDialogComponent } from '../users/components/add-user-info-dialog/add-user-info-dialog.component';
import { Customers } from '../users/models/customers';
import { CustomersService } from '../users/services/customers.service';

@Component({
    selector: 'app-operations',
    imports: [
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
    ],
    templateUrl: './operations.component.html',
    styleUrl: './operations.component.scss'
})
export class OperationsComponent {
  customers: Customers[] = [];
  displayedColumns: string[] = [
    'select',
    'position',
    'image',
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
  selection = new SelectionModel<any>(true, []);
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

  /** Whether the number of selected elements matches the total number of rows. */
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
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Customers): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
