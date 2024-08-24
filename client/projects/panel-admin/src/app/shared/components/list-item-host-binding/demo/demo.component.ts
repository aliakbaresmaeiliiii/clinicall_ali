import { Component, signal } from '@angular/core';
import { ListItemHostBindingComponent } from '../list-item-host-binding.component';

@Component({
  selector: 'list-item-demo',
  standalone: true,
  imports: [ListItemHostBindingComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  step1Complete = signal(false);
  step2Complete = signal(false);
  step3Complete = signal(false);
}
