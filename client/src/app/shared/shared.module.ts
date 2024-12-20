import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberOnlyDirective } from 'ali';
import { ImgUploaderComponent } from './components/img-uploader/img-uploader.component';
import { RatingPickerPageComponent } from './components/rating-picker-page/rating-picker-page.component';
import { AgeValidatorDirective } from './directives/age-validator/age-validator.directive';
import { ChunkPipe } from './pipes/chunk/chunk.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { RangePickerComponent } from './components/range-picker/range-picker.component';
import { CopyLinkDialogComponent } from './components/copy-link-dialog/copy-link-dialog.component';

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
  MatNativeDateModule,
  CopyLinkDialogComponent,
];
const COMMON_MODULES = [CommonModule, ReactiveFormsModule, FormsModule];
// const SHARED_COMPONENT = [];
@NgModule({
  declarations: [SearchBarComponent, ChunkPipe,RangePickerComponent],
  imports: [...COMMON_MODULES, ...ANGULR_MATERIAL_MODULES,],
  exports: [...ANGULR_MATERIAL_MODULES, ...COMMON_MODULES, ChunkPipe,RangePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
