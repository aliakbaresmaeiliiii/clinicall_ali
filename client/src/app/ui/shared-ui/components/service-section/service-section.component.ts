import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';

@Component({
    selector: 'app-service-section',
    templateUrl: './service-section.component.html',
    styleUrl: './service-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServiceSectionComponent {
  title = input<string>();

}
