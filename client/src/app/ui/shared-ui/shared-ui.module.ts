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

@NgModule({
  declarations: [
    ServiceSectionComponent,
    CardComponent,
    PlaceholderComponent,
    SwiperSliderComponent,
    SwiperSliderCardComponent,
    CustomTitleComponent
  ],
  imports: [CommonModule, MatCardModule,
    ButtonComponent

  ],
  exports: [
    ServiceSectionComponent,
    CardComponent,
    PlaceholderComponent,
    MatButtonModule,
    SwiperSliderComponent,
    SwiperSliderCardComponent,
    CustomTitleComponent
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {}
