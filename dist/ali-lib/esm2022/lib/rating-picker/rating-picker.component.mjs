import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class RatingPickerComponent {
    onBlur() {
        this.onTouch();
    }
    constructor(cd) {
        this.cd = cd;
        this.value = null;
        this.disabled = false;
        this.changed = new EventEmitter();
        this.onChange = () => { };
        this.onTouch = () => { };
    }
    ngOnChanges(changes) {
        if (changes['value']) {
            this.onChange(changes['value'].currentValue);
        }
    }
    setValue(value) {
        this.value = value;
        this.onChange(this.value);
        this.changed.emit(this.value);
    }
    writeValue(obj) {
        this.value = obj;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cd.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: RatingPickerComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0", type: RatingPickerComponent, isStandalone: true, selector: "lib-rating-picker", inputs: { value: "value", disabled: "disabled" }, outputs: { changed: "changed" }, host: { listeners: { "blur": "onBlur()" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: RatingPickerComponent,
                multi: true,
            },
        ], usesOnChanges: true, ngImport: i0, template: "<ul class=\"rating-options\" [ngClass]=\"{ disabled: disabled }\">\r\n  <li [ngClass]=\"{ active: value === 'great' }\" (click)=\"setValue('great')\">\uD83D\uDC4C</li>\r\n  <li [ngClass]=\"{ active: value === 'good' }\" (click)=\"setValue('good')\">\uD83D\uDE0A</li>\r\n  <li [ngClass]=\"{ active: value === 'neutral' }\" (click)=\"setValue('neutral')\">\uD83D\uDE10</li>\r\n  <li [ngClass]=\"{ active: value === 'bad' }\" (click)=\"setValue('bad')\">\uD83E\uDD7A</li>\r\n</ul>\r\n", styles: [":host{width:100%;display:block;border-radius:var(--border-radius, 8px)}.rating-options{margin:0;padding:var(--spacing-step, 4px);list-style:none;display:flex;box-sizing:border-box;min-width:200px;justify-content:space-between;background-color:var(--color-picker-background, #fff);border-radius:var(--border-radius, 8px)}.rating-options.disabled{opacity:.5;pointer-events:none}.rating-options li{padding:15px 13px;border-radius:var(--border-radius, 8px);cursor:pointer;box-sizing:border-box;font-size:var(--font-size-picker-option, 26px)}.rating-options li:hover,.rating-options li.active{background-color:var(--color-picker-bg-active, #daeefa)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: RatingPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-rating-picker', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RatingPickerComponent,
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"rating-options\" [ngClass]=\"{ disabled: disabled }\">\r\n  <li [ngClass]=\"{ active: value === 'great' }\" (click)=\"setValue('great')\">\uD83D\uDC4C</li>\r\n  <li [ngClass]=\"{ active: value === 'good' }\" (click)=\"setValue('good')\">\uD83D\uDE0A</li>\r\n  <li [ngClass]=\"{ active: value === 'neutral' }\" (click)=\"setValue('neutral')\">\uD83D\uDE10</li>\r\n  <li [ngClass]=\"{ active: value === 'bad' }\" (click)=\"setValue('bad')\">\uD83E\uDD7A</li>\r\n</ul>\r\n", styles: [":host{width:100%;display:block;border-radius:var(--border-radius, 8px)}.rating-options{margin:0;padding:var(--spacing-step, 4px);list-style:none;display:flex;box-sizing:border-box;min-width:200px;justify-content:space-between;background-color:var(--color-picker-background, #fff);border-radius:var(--border-radius, 8px)}.rating-options.disabled{opacity:.5;pointer-events:none}.rating-options li{padding:15px 13px;border-radius:var(--border-radius, 8px);cursor:pointer;box-sizing:border-box;font-size:var(--font-size-picker-option, 26px)}.rating-options li:hover,.rating-options li.active{background-color:var(--color-picker-bg-active, #daeefa)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jbGllbnQvYWxpLWxpYi9zcmMvbGliL3JhdGluZy1waWNrZXIvcmF0aW5nLXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9jbGllbnQvYWxpLWxpYi9zcmMvbGliL3JhdGluZy1waWNrZXIvcmF0aW5nLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBb0J6RSxNQUFNLE9BQU8scUJBQXFCO0lBWWhDLE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUlELFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEJ6QyxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUc1QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUM1QyxhQUFRLEdBQXNDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQU92RCxZQUFPLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRWMsQ0FBQztJQUU5QyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFvQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELFVBQVUsQ0FBQyxHQUFrQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUUsVUFBbUI7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzhHQTNDVSxxQkFBcUI7a0dBQXJCLHFCQUFxQixnTUFUckI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsK0NDN0JILG1lQU1BLCtyQkRhWSxZQUFZOzsyRkFhWCxxQkFBcUI7a0JBaEJqQyxTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsYUFJWjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLHVCQUF1Qjs0QkFDbEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0YsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07c0ZBSS9DLEtBQUs7c0JBREosS0FBSztnQkFJTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sT0FBTztzQkFETixNQUFNO2dCQUtQLE1BQU07c0JBREwsWUFBWTt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCB0eXBlIFJhdGluZ09wdGlvbnMgPSAnZ3JlYXQnIHwgJ2dvb2QnIHwgJ25ldXRyYWwnIHwgJ2JhZCcgfCBudWxsO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItcmF0aW5nLXBpY2tlcicsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vcmF0aW5nLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmw6ICcuL3JhdGluZy1waWNrZXIuY29tcG9uZW50LnNjc3MnLFxyXG5cclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBSYXRpbmdQaWNrZXJDb21wb25lbnQsXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmF0aW5nUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgQElucHV0KClcclxuICB2YWx1ZTogUmF0aW5nT3B0aW9ucyA9IG51bGw7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmF0aW5nT3B0aW9ucz4oKTtcclxuICBvbkNoYW5nZTogKG5ld1ZhbHVlOiBSYXRpbmdPcHRpb25zKSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMub25Ub3VjaCgpO1xyXG4gIH1cclxuXHJcbiAgb25Ub3VjaDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWUodmFsdWU6IFJhdGluZ09wdGlvbnMpIHtcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICB0aGlzLmNoYW5nZWQuZW1pdCh0aGlzLnZhbHVlKTtcclxuICB9XHJcbiAgd3JpdGVWYWx1ZShvYmo6IFJhdGluZ09wdGlvbnMpOiB2b2lkIHtcclxuICAgIHRoaXMudmFsdWUgPSBvYmo7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcclxuICB9XHJcbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiPHVsIGNsYXNzPVwicmF0aW5nLW9wdGlvbnNcIiBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBkaXNhYmxlZCB9XCI+XHJcbiAgPGxpIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiB2YWx1ZSA9PT0gJ2dyZWF0JyB9XCIgKGNsaWNrKT1cInNldFZhbHVlKCdncmVhdCcpXCI+8J+RjDwvbGk+XHJcbiAgPGxpIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiB2YWx1ZSA9PT0gJ2dvb2QnIH1cIiAoY2xpY2spPVwic2V0VmFsdWUoJ2dvb2QnKVwiPvCfmIo8L2xpPlxyXG4gIDxsaSBbbmdDbGFzc109XCJ7IGFjdGl2ZTogdmFsdWUgPT09ICduZXV0cmFsJyB9XCIgKGNsaWNrKT1cInNldFZhbHVlKCduZXV0cmFsJylcIj7wn5iQPC9saT5cclxuICA8bGkgW25nQ2xhc3NdPVwieyBhY3RpdmU6IHZhbHVlID09PSAnYmFkJyB9XCIgKGNsaWNrKT1cInNldFZhbHVlKCdiYWQnKVwiPvCfpbo8L2xpPlxyXG48L3VsPlxyXG4iXX0=