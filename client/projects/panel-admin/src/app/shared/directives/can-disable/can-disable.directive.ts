import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { toBooleanProperty } from '../../utils/type-coercion';

@Directive({
  selector: '[appCanDisable]',
  standalone: true,
})
export class CanDisableDirective {
  @Input()
  @HostBinding('class.disabled')
  set disabled(value: any) {
    this.#disabled = toBooleanProperty(value);
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  #disabled = false;

  @HostBinding('attr.disabled')
  protected get nativeDisabled(): '' | null {
    return this.disabled ? '' : null;
  }

  @HostListener('click', ['$event'])
  @HostListener('dbclick', ['$event'])
  onClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
