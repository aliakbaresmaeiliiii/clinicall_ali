import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CanDisableDirective } from '../../directives/can-disable/can-disable.directive';
import { HasTabIndexDirective } from '../../directives/has-disable/has-tab-index.directive';
import { toBooleanProperty } from '../../utils/type-coercion';


export const BUTTON_CLASESS = {
  solid: 'solid-button',
  stroked: 'stroked-button',
  dashed: 'dashed-button',
} as const;

export type ButtonAppearance = keyof typeof BUTTON_CLASESS;
export type ButtonClasses = (typeof BUTTON_CLASESS)[ButtonAppearance];

@Component({
  selector: 'button[dfButton],a[dfButton]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  hostDirectives: [
    {
      directive: CanDisableDirective,
      inputs: ['disabled'],
    },
    {
      directive: HasTabIndexDirective,
      inputs: ['tabIndex', 'pauseFocusing: disabled'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  appearance: 'solid' | 'stroked' | 'dashed' = 'solid';

  @Input()
  set loading(value: any) {
    this.#loading = toBooleanProperty(value);
  }

  get loading(): boolean {
    return this.#loading;
  }

  #loading = false;

  @HostBinding('class')
  protected get buttonTypeHostClass(): ButtonClasses {
    return BUTTON_CLASESS[this.appearance];
  }
}
