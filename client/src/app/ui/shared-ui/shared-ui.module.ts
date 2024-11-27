import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ServiceSectionComponent } from './components/service-section/service-section.component';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {}
