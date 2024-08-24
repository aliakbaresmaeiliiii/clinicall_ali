import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { OptionComponent } from './option/option.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'lib-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
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
  @Input()
  label = '';

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
  
  @Output()
  readonly opened = new EventEmitter<void>();
  @Output()
  readonly closed = new EventEmitter<void>();

  @HostListener('click')
  open() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  @ContentChildren(OptionComponent, { descendants: true })
  options!: QueryList<OptionComponent>;
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
    this.findOptionsByValue(value)?.highlightAsSelected;
  }

  private findOptionsByValue(value: string | null) {
    return this.options && this.options.find((o) => o.value === value);
  }
}
