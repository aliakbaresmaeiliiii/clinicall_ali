import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HasTabIndexDirective } from '../../directives/has-disable/has-tab-index.directive';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [NgIf],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: HasTabIndexDirective,
      inputs: ['tabIndex', 'pauseFocusing'],
    },
  ],
})
export class ChipComponent<T> {
  @Input()
  removable = false;

  @Input()
  value: T | null = null;

  @Output()
  removed = new EventEmitter<ChipComponent<T>>();

  onClick() {
    if (this.removable) {
      this.removed.emit(this);
    }
  }
}
