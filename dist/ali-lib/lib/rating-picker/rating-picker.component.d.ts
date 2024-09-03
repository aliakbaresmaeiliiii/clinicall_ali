import { ChangeDetectorRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;
export declare class RatingPickerComponent implements OnChanges, ControlValueAccessor {
    private cd;
    value: RatingOptions;
    disabled: boolean;
    changed: EventEmitter<RatingOptions>;
    onChange: (newValue: RatingOptions) => void;
    onBlur(): void;
    onTouch: () => void;
    constructor(cd: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    setValue(value: RatingOptions): void;
    writeValue(obj: RatingOptions): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RatingPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RatingPickerComponent, "lib-rating-picker", never, { "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "changed": "changed"; }, never, never, true, never>;
}
