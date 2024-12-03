import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  input,
  OnChanges,
  OnDestroy,
  output,
  QueryList,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OptionComponent } from '../option/option.component';

export type SelectValue<T> = T | null;

@Component({
  selector: 'ali-select',
  imports: [CommonModule, OverlayModule],
  templateUrl: './ali-select.component.html',
  styleUrl: './ali-select.component.scss',
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0,1,0.45,1.34)')]),
      transition(':leave', [
        animate('420ms cubic-bezier(0.88,-0.7,0.86,0.85)'),
      ]),
    ]),
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AliSelectComponent,
      multi: true,
    },
  ],
})
export class AliSelectComponent<T>
  implements OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor
{
  @Input()
  label = '';

  @Input()
  searchable = false;

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  // displayWith = input<((value: T) => string | number) | null>(null);

  // compareWith = input<(v1: T | null, v2: T | null) => boolean>(
  //   (v1, v2) => v1 === v2
  // );

  @Input()
  displayWith: ((value: T) => string | number) | null = null;

  @Input()
  compareWith: ((v1: T | null, v2: T | null) => boolean) = (v1, v2) => v1 === v2;


  @Input()
  set value(value: SelectValue<T> | any) {
    this.setupValue(value);
    this.onChange(this.value);
    this.highlightSelectedOptions();
  }
  get value() {
    if (this.selectionModel.isEmpty()) {
      return null;
    }
    if (this.selectionModel.isMultipleSelection()) {
      return this.selectionModel.selected;
    }
    return this.selectionModel.selected[0];
  }
  private selectionModel = new SelectionModel<T>(
    coerceBooleanProperty(this.multiple)
  );

  opened = output<void>();

  selectionChanged = output<SelectValue<T>>();

  closed = output<void>();

  searchChanged = output<string>();

  @HostListener('blur')
  markAsTouched() {
    if (!this.disabled && !this.isOpen) {
      this.onToched();
      this.cd.markForCheck();
    }
  }

  @HostListener('click')
  open() {
    if (this.disabled) return;
    this.isOpen = true;
    if (this.searchable) {
      setTimeout(() => {
        this.searchInputEl()?.nativeElement.focus();
      }, 0);
    }
    this.cd.markForCheck();
  }

  close() {
    this.isOpen = false;
    this.onToched();
    this.hostEl.nativeElement.focus();
    this.cd.markForCheck();
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' && !this.isOpen) {
      this.open();
      return;
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.isOpen) {
      this.listKeyManager.onKeydown(e);
      return;
    }
    if (e.key === 'Enter' && this.isOpen && this.listKeyManager.activeItem) {
      this.handleSelection(this.listKeyManager.activeItem);
    }
  }

  // options = contentChildren(OptionComponent, { descendants: true });
  @ContentChildren(OptionComponent, { descendants: true })
  options!: QueryList<OptionComponent<T>>;

  searchInputEl = viewChild.required<ElementRef<HTMLInputElement>>('input');

  @HostBinding('class.select-panel-open')
  isOpen = false;

  @HostBinding('attr.tabIndex')
  tabIndex = input(0);

  protected get displayValue() {
    const displayWith = this.displayWith;
    if (displayWith && this.value) {
      if (Array.isArray(this.value)) {
        return this.value.map(displayWith);
      }
      return displayWith(this.value);
    }

    return this.value;
  }
  protected onChange: (newValue: SelectValue<T>) => void = () => {};
  protected onToched: () => void = () => {};

  private optionMap = new Map<T | null, OptionComponent<T>>();
  private unsubscribe$ = new Subject<void>();
  private listKeyManager!: ActiveDescendantKeyManager<OptionComponent<T>>;

  constructor(
    @Attribute('multiple') private multiple: string | null,
    private cd: ChangeDetectorRef,
    private hostEl: ElementRef
  ) {}

  writeValue(value: SelectValue<T>): void {
    this.setupValue(value);
    this.highlightSelectedOptions();
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onToched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled; // Correct way to update an InputSignal
    this.cd.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['compareWith']) {
      this.selectionModel.compareWith = changes['compareWith'].currentValue;
      this.highlightSelectedOptions();
    }
  }

  ngAfterContentInit(): void {
    this.listKeyManager = new ActiveDescendantKeyManager(
      this.options
    ).withWrap();
    this.listKeyManager.change
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(itemIndex => {
        this.options.get(itemIndex)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    this.selectionModel.changed
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(values => {
        values.removed.forEach(rv => this.optionMap.get(rv)?.deselect());
        values.added.forEach(av =>
          this.optionMap.get(av)?.highlightAsSelected()
        );
      });
    this.options.changes
      .pipe(
        startWith<QueryList<OptionComponent<T>>>(this.options),
        tap(() => this.refreshOptionsMap()),
        tap(() => queueMicrotask(() => this.highlightSelectedOptions())),
        switchMap(options => merge(...options.map((o: any) => o.selected))),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((selectedOption: any) => this.handleSelection(selectedOption));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clearSelection(e?: Event) {
    e?.stopPropagation();
    if (this.disabled) return;
    this.selectionModel.clear();
    this.selectionChanged.emit(this.value);
    this.onChange(this.value);
    this.cd.markForCheck();
  }

  protected onPanelAnimationDone({ fromState, toState }: AnimationEvent) {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  protected onHandleInput(e: Event) {
    this.searchChanged.emit((e.target as HTMLInputElement).value);
  }

  private setupValue(value: SelectValue<T>) {
    this.selectionModel.clear();
    if (value) {
      if (Array.isArray(value)) {
        this.selectionModel.select(...value);
      } else {
        this.selectionModel.select(value);
      }
    }
  }

  private handleSelection(option: OptionComponent<T>) {
    if (this.disabled) return;
    const value = option.value;
    if (value) {
      this.selectionModel.toggle(value);
      this.selectionChanged.emit(this.value);
      this.onChange(this.value);
    }
    if (!this.selectionModel.isMultipleSelection()) {
      this.close();
    }
  }

  private refreshOptionsMap() {
    this.optionMap.clear();
    this.options.forEach(o => this.optionMap.set(o.value, o));
  }

  private highlightSelectedOptions() {
    const valuesWithUpdatedReferences = this.selectionModel.selected.map(
      value => {
        const correspondingOption = this.findOptionsByValue(value);
        return correspondingOption ? correspondingOption.value! : value;
      }
    );
    this.selectionModel.clear();
    this.selectionModel.select(...valuesWithUpdatedReferences);
  }

  private findOptionsByValue(value: T | null) {
    if (this.optionMap.has(value)) {
      return this.optionMap.get(value);
    }
    const options = this.options;
    return options && options.find(o => this.compareWith(o.value, value));
  }
}
