import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  Component,
  HostListener,
  Input,
  contentChildren,
  input,
  output
} from '@angular/core';
import { OptionComponent } from 'ali';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone:false,
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
      transition(':leave', [
        animate('420ms cubic-bezier(0.88,-0.7, 0.86, 0.85)'),
      ]),
    ]),
  ],
})
export class SelectComponent implements AfterContentInit {
  readonly label = input('');

  @Input()
  set value(value: string | null) {
    this.selectionModel.clear();
    if (value) {
      this.selectionModel.select(value);
    }
  }
  get value() {
    return this.selectionModel.selected[0] || null;
  }

  private selectionModel = new SelectionModel<string>();
  
  readonly opened = output<void>();
  readonly closed = output<void>();

  @HostListener('click')
  open() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  readonly options = contentChildren(OptionComponent, { descendants: true });
  isOpen = false;

  constructor() {}

  ngAfterContentInit(): void {
    this.highlightSelectedOptions(this.value);
  }

  onPanelAnimationDone({ fromState, toState }: AnimationEvent | any) {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  private highlightSelectedOptions(value: string | null) {
    this.findOptionsByValue(value)?.highlightAsSelected();
  }

  private findOptionsByValue(value: string | null) {
    const options = this.options();
    return options && options.find((o:any) => o.value() === value);
  }
}
