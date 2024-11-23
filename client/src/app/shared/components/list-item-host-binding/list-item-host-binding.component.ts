import { Component, HostBinding, input } from '@angular/core';

@Component({
    selector: 'app-list-item-host-binding',
    imports: [],
    templateUrl: './list-item-host-binding.component.html',
    styleUrl: './list-item-host-binding.component.scss'
})
export class ListItemHostBindingComponent {
  readonly step = input.required<number>();
  @HostBinding('class.complete')
readonly isComplete = input(false);
}
