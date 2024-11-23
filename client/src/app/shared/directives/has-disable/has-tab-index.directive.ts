import { Directive, HostBinding, Input, input } from '@angular/core';
import { toNumberProperty } from '../../utils/type-coercion';

type TabIndexInput = number | string;

@Directive({
  selector: '[appHasTabIndex]',
  standalone: true,
})
export class HasTabIndexDirective {
  readonly pauseFocusing = input(false);

  @Input()
  @HostBinding('attr.tabindex')
  set tabIndex(value: TabIndexInput) {
    this.#tabIndex = toNumberProperty(value);
  }
  get tabIndex() {
    return this.pauseFocusing() ? -1 : this.#tabIndex;
  }
  #tabIndex: number = 0;
}
