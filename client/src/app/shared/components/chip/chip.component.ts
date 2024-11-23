import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { HasTabIndexDirective } from '../../directives/has-disable/has-tab-index.directive';

@Component({
    selector: 'app-chip',
    imports: [NgIf],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: HasTabIndexDirective,
            inputs: ['tabIndex', 'pauseFocusing'],
        },
    ]
})
export class ChipComponent<T> {
  readonly removable = input(false);

  readonly value = input<T | null>(null);

  readonly removed = output<ChipComponent<T>>();

  onClick() {
    if (this.removable()) {
      this.removed.emit(this);
    }
  }
}
