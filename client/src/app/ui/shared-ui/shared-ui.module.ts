import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxStarsModule } from 'ngx-stars';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CustomTabComponent } from './components/custom-tab/custom-tab.component';
import { CustomTitleComponent } from './components/custom-title/custom-title.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { GenericAutoCompeleteComponent } from './components/generic-auto-compelete/generic-auto-compelete.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ServiceSectionComponent } from './components/service-section/service-section.component';
import { SwiperSliderCardComponent } from './components/swiper-slider-card/swiper-slider-card.component';
import { SwiperSliderComponent } from './components/swiper-slider/swiper-slider.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPOENTN = [
  ServiceSectionComponent,
  CardComponent,
  PlaceholderComponent,
  SwiperSliderComponent,
  SwiperSliderCardComponent,
  CustomTitleComponent,
  FeedbackComponent,
  GenericAutoCompeleteComponent,
  CustomTabComponent,
];

const COMMON_MODULES = [
  CommonModule,
  NgxStarsModule,
  ButtonComponent,
  ReactiveFormsModule,
  FormsModule,
];

const MATERIAL_MODULE = [
  MatTabsModule,
  MatDividerModule,
  MatInputModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
];
@NgModule({
  declarations: [...COMPOENTN],
  imports: [...COMMON_MODULES, ...MATERIAL_MODULE],
  exports: [...COMPOENTN, ...COMMON_MODULES, ...MATERIAL_MODULE],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {}
