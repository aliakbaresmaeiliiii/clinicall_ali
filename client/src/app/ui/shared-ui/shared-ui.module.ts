import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceSectionComponent } from './components/service-section/service-section.component';
import { CardComponent } from './components/card/card.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { SepereateSectionsComponent } from './components/sepereate-sections/sepereate-sections.component';

@NgModule({
  declarations: [
    ServiceSectionComponent,
    CardComponent,
    PlaceholderComponent,
  ],
  imports: [CommonModule],
  exports: [
    ServiceSectionComponent,
    CardComponent,
    PlaceholderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {}
