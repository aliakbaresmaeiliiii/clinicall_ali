import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-list-item-host-binding',
  standalone: true,
  imports: [],
  templateUrl: './list-item-host-binding.component.html',
  styleUrl: './list-item-host-binding.component.scss',
})
export class ListItemHostBindingComponent {
  @Input({ required: true }) step!: number;
  @Input() @HostBinding('class.complete') isComplete = false;
}
