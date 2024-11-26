import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RatingPickerPageComponent } from './components/rating-picker-page/rating-picker-page.component';
import { AgeValidatorDirective } from './directives/age-validator/age-validator.directive';
import { ChunkPipe } from './pipes/chunk/chunk.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NumberOnlyDirective } from 'ali';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ImgUploaderComponent } from './components/img-uploader/img-uploader.component';

const ANGULR_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatDividerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatButtonModule,
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  DragDropModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatTooltipModule,
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  DatePipe,
  MatIconModule,
  MatSelectModule,
  MatMenuModule,
  AgeValidatorDirective,
  NumberOnlyDirective,
  MatCheckboxModule,
  MatListModule,
  MatTabsModule,
  MatPaginatorModule,
  MatTableModule,
  MatRadioModule,
  MatDatepickerModule,
  ImgUploaderComponent,
  RatingPickerPageComponent,
];
const COMMON_MODULES = [CommonModule, ReactiveFormsModule, FormsModule];
// const SHARED_COMPONENT = [];
@NgModule({
  declarations: [
    SearchBarComponent,
    ChunkPipe,
  
  ],
  imports: [...COMMON_MODULES, ...ANGULR_MATERIAL_MODULES],
  exports: [
    ...ANGULR_MATERIAL_MODULES,
    ...COMMON_MODULES,
    ChunkPipe,
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
