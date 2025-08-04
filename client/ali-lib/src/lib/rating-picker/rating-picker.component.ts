import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnChanges,
  SimpleChanges,
  input,
  output,
  signal,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type RatingOptions = "great" | "good" | "neutral" | "bad" | null;

@Component({
  selector: "lib-rating-picker",
  standalone:true,
  imports: [CommonModule],
  templateUrl: "./rating-picker.component.html",
  styleUrl: "./rating-picker.component.scss",
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
  value = signal<RatingOptions>(null);

  disabled = signal(false);

  readonly changed = output<RatingOptions>();
  onChange: (newValue: RatingOptions) => void = () => {};

  @HostListener("blur")
  onBlur() {
    this.onTouch();
  }

  onTouch: () => void = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      this.onChange(changes["value"].currentValue);
    }
  }

  setValue(value: RatingOptions) {
    this.value.set(value);
    const valueValue = this.value();
    this.onChange(valueValue);
    this.changed.emit(valueValue);
  }
  writeValue(obj: RatingOptions): void {
    this.value.set(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this.cd.markForCheck();
  }
}
