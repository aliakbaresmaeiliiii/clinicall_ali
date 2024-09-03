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
        ], usesOnChanges: true, ngImport: i0, template: "<ul class=\"rating-options\" [ngClass]=\"{ disabled: disabled }\">\n  <li [ngClass]=\"{ active: value === 'great' }\" (click)=\"setValue('great')\">\uD83D\uDC4C</li>\n  <li [ngClass]=\"{ active: value === 'good' }\" (click)=\"setValue('good')\">\uD83D\uDE0A</li>\n  <li [ngClass]=\"{ active: value === 'neutral' }\" (click)=\"setValue('neutral')\">\uD83D\uDE10</li>\n  <li [ngClass]=\"{ active: value === 'bad' }\" (click)=\"setValue('bad')\">\uD83E\uDD7A</li>\n</ul>\n", styles: [":host{width:100%;display:block;border-radius:var(--border-radius, 8px)}.rating-options{margin:0;padding:var(--spacing-step, 4px);list-style:none;display:flex;box-sizing:border-box;min-width:200px;justify-content:space-between;background-color:var(--color-picker-background, #fff);border-radius:var(--border-radius, 8px)}.rating-options.disabled{opacity:.5;pointer-events:none}.rating-options li{padding:15px 13px;border-radius:var(--border-radius, 8px);cursor:pointer;box-sizing:border-box;font-size:var(--font-size-picker-option, 26px)}.rating-options li:hover,.rating-options li.active{background-color:var(--color-picker-bg-active, #daeefa)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: RatingPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-rating-picker', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: RatingPickerComponent,
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"rating-options\" [ngClass]=\"{ disabled: disabled }\">\n  <li [ngClass]=\"{ active: value === 'great' }\" (click)=\"setValue('great')\">\uD83D\uDC4C</li>\n  <li [ngClass]=\"{ active: value === 'good' }\" (click)=\"setValue('good')\">\uD83D\uDE0A</li>\n  <li [ngClass]=\"{ active: value === 'neutral' }\" (click)=\"setValue('neutral')\">\uD83D\uDE10</li>\n  <li [ngClass]=\"{ active: value === 'bad' }\" (click)=\"setValue('bad')\">\uD83E\uDD7A</li>\n</ul>\n", styles: [":host{width:100%;display:block;border-radius:var(--border-radius, 8px)}.rating-options{margin:0;padding:var(--spacing-step, 4px);list-style:none;display:flex;box-sizing:border-box;min-width:200px;justify-content:space-between;background-color:var(--color-picker-background, #fff);border-radius:var(--border-radius, 8px)}.rating-options.disabled{opacity:.5;pointer-events:none}.rating-options li{padding:15px 13px;border-radius:var(--border-radius, 8px);cursor:pointer;box-sizing:border-box;font-size:var(--font-size-picker-option, 26px)}.rating-options li:hover,.rating-options li.active{background-color:var(--color-picker-bg-active, #daeefa)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jbGllbnQvYWxpLWxpYi9zcmMvbGliL3JhdGluZy1waWNrZXIvcmF0aW5nLXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9jbGllbnQvYWxpLWxpYi9zcmMvbGliL3JhdGluZy1waWNrZXIvcmF0aW5nLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBb0J6RSxNQUFNLE9BQU8scUJBQXFCO0lBWWhDLE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUlELFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBaEJ6QyxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUc1QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUM1QyxhQUFRLEdBQXNDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQU92RCxZQUFPLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRWMsQ0FBQztJQUU5QyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFvQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELFVBQVUsQ0FBQyxHQUFrQjtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUUsVUFBbUI7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDOzhHQTNDVSxxQkFBcUI7a0dBQXJCLHFCQUFxQixnTUFUckI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsK0NDN0JILHVkQU1BLCtyQkRhWSxZQUFZOzsyRkFhWCxxQkFBcUI7a0JBaEJqQyxTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsYUFJWjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLHVCQUF1Qjs0QkFDbEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0YsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07c0ZBSS9DLEtBQUs7c0JBREosS0FBSztnQkFJTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sT0FBTztzQkFETixNQUFNO2dCQUtQLE1BQU07c0JBREwsWUFBWTt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IHR5cGUgUmF0aW5nT3B0aW9ucyA9ICdncmVhdCcgfCAnZ29vZCcgfCAnbmV1dHJhbCcgfCAnYmFkJyB8IG51bGw7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1yYXRpbmctcGlja2VyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9yYXRpbmctcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3JhdGluZy1waWNrZXIuY29tcG9uZW50LnNjc3MnLFxuXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IFJhdGluZ1BpY2tlckNvbXBvbmVudCxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgdmFsdWU6IFJhdGluZ09wdGlvbnMgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIGNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJhdGluZ09wdGlvbnM+KCk7XG4gIG9uQ2hhbmdlOiAobmV3VmFsdWU6IFJhdGluZ09wdGlvbnMpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaCgpO1xuICB9XG5cbiAgb25Ub3VjaDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10pIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlOiBSYXRpbmdPcHRpb25zKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cbiAgd3JpdGVWYWx1ZShvYmo6IFJhdGluZ09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gb2JqO1xuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoID0gZm47XG4gIH1cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxufVxuIiwiPHVsIGNsYXNzPVwicmF0aW5nLW9wdGlvbnNcIiBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBkaXNhYmxlZCB9XCI+XG4gIDxsaSBbbmdDbGFzc109XCJ7IGFjdGl2ZTogdmFsdWUgPT09ICdncmVhdCcgfVwiIChjbGljayk9XCJzZXRWYWx1ZSgnZ3JlYXQnKVwiPvCfkYw8L2xpPlxuICA8bGkgW25nQ2xhc3NdPVwieyBhY3RpdmU6IHZhbHVlID09PSAnZ29vZCcgfVwiIChjbGljayk9XCJzZXRWYWx1ZSgnZ29vZCcpXCI+8J+YijwvbGk+XG4gIDxsaSBbbmdDbGFzc109XCJ7IGFjdGl2ZTogdmFsdWUgPT09ICduZXV0cmFsJyB9XCIgKGNsaWNrKT1cInNldFZhbHVlKCduZXV0cmFsJylcIj7wn5iQPC9saT5cbiAgPGxpIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiB2YWx1ZSA9PT0gJ2JhZCcgfVwiIChjbGljayk9XCJzZXRWYWx1ZSgnYmFkJylcIj7wn6W6PC9saT5cbjwvdWw+XG4iXX0=