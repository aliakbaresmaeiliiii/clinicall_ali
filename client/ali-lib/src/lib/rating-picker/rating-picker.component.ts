import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'lib-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrl: './rating-picker.component.scss',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerComponent implements OnChanges, ControlValueAccessor {
  @Input()
  value: RatingOptions = null;

  @Input()
  disabled = false;

  @Output()
  changed = new EventEmitter<RatingOptions>();
  onChange: (newValue: RatingOptions) => void = () => {};

  @HostListener('blur')
  onBlur() {
    this.onTouch();
  }

  onTouch: () => void = () => {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.onChange(changes['value'].currentValue);
    }
  }

  setValue(value: RatingOptions) {
    this.value = value;
    this.onChange(this.value);
    this.changed.emit(this.value);
  }
  writeValue(obj: RatingOptions): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

}
