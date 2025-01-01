import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ServiceSectionComponent } from './components/service-section/service-section.component';
import { MatButtonModule } from '@angular/material/button';
import { SwiperSliderComponent } from './components/swiper-slider/swiper-slider.component';
import { SwiperSliderCardComponent } from './components/swiper-slider-card/swiper-slider-card.component';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CustomTitleComponent } from './components/custom-title/custom-title.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxStarsModule } from 'ngx-stars';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ServiceSectionComponent,
    CardComponent,
    PlaceholderComponent,
    SwiperSliderComponent,
    SwiperSliderCardComponent,
    CustomTitleComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    NgxStarsModule,
    MatCardModule,
    ButtonComponent,
    SharedModule,
    MatTabsModule,
    MatDividerModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  exports: [
    ServiceSectionComponent,
    CardComponent,
    PlaceholderComponent,
    MatButtonModule,
    SwiperSliderComponent,
    SwiperSliderCardComponent,
    CustomTitleComponent,
    FeedbackComponent,
    MatTabsModule,
    MatDividerModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {}
