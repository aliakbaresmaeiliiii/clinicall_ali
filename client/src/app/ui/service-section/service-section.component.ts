import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-service-section',

  templateUrl: './service-section.component.html',
  styleUrl: './service-section.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ServiceSectionComponent {

}
