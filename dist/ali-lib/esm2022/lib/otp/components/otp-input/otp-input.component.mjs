import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../pipes/keys.pipe";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "ngx-countdown";
export class OtpInputComponent {
    constructor(keysPipe, platformId) {
        this.keysPipe = keysPipe;
        this.platformId = platformId;
        this.config = { length: 4 };
        // tslint:disable-next-line: no-output-on-prefix
        this.onInputChange = new EventEmitter();
        this.onCountDown = new EventEmitter();
        this.inputControls = new Array(this.config.length);
        this.componentKey = Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
        this.isTimeDone = false;
    }
    ngOnInit() {
        this.otpForm = new FormGroup({});
        for (let index = 0; index < this.config.length; index++) {
            this.otpForm.addControl(this.getControlName(index), new FormControl());
        }
        this.inputType = this.getInputType();
    }
    ngAfterViewInit() {
        // if (isPlatformBrowser(this.platformId)) {
        //   if (!this.config.disableAutoFocus && document) {
        //     const containerItem = document?.getElementById(
        //       `c_${this.componentKey}`
        //     );
        //     if (containerItem) {
        //       containerItem.addEventListener('paste', (evt) =>
        //         // this.handlePaste(evt)
        //       // );
        //       const ele: any = containerItem.getElementsByClassName('otp-input')[0];
        //       if (ele && ele.focus) {
        //         ele.focus();
        //       }
        //     }
        //   }
        // }
    }
    getControlName(idx) {
        return `ctrl_${idx}`;
    }
    ifLeftArrow(event) {
        return this.ifKeyCode(event, 37);
    }
    ifRightArrow(event) {
        return this.ifKeyCode(event, 39);
    }
    ifBackspaceOrDelete(event) {
        return (event.key === 'Backspace' ||
            event.key === 'Delete' ||
            this.ifKeyCode(event, 8) ||
            this.ifKeyCode(event, 46));
    }
    ifKeyCode(event, targetCode) {
        const key = event.keyCode || event.charCode;
        // tslint:disable-next-line: triple-equals
        return key == targetCode ? true : false;
    }
    onKeyDown($event) {
        var isSpace = this.ifKeyCode($event, 32);
        if (isSpace) {
            // prevent space
            return false;
        }
    }
    onKeyUp($event, inputIdx) {
        const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
        const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
        if (this.ifRightArrow($event)) {
            this.setSelected(nextInputId);
            return;
        }
        if (this.ifLeftArrow($event)) {
            this.setSelected(prevInputId);
            return;
        }
        const isBackspace = this.ifBackspaceOrDelete($event);
        if (isBackspace && !$event.target.value) {
            this.setSelected(prevInputId);
            this.rebuildValue();
            return;
        }
        if (!$event.target.value) {
            return;
        }
        if (this.ifValidEntry($event)) {
            this.setSelected(nextInputId);
        }
        this.rebuildValue();
    }
    appendKey(id) {
        return `${id}_${this.componentKey}`;
    }
    setSelected(eleId) {
        this.focusTo(eleId);
        const ele = document.getElementById(eleId);
        if (ele && ele.setSelectionRange) {
            setTimeout(() => {
                ele.setSelectionRange(0, 1);
            }, 0);
        }
    }
    ifValidEntry(event) {
        const inp = String.fromCharCode(event.keyCode);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return (isMobile ||
            /[a-zA-Z0-9-_]/.test(inp) ||
            (this.config.allowKeyCodes &&
                this.config.allowKeyCodes.includes(event.keyCode)) ||
            (event.keyCode >= 96 && event.keyCode <= 105));
    }
    focusTo(eleId) {
        const ele = document.getElementById(eleId);
        if (ele) {
            ele.focus();
        }
    }
    // method to set component value
    setValue(value) {
        if (this.config.allowNumbersOnly && isNaN(value)) {
            return;
        }
        this.otpForm.reset();
        if (!value) {
            this.rebuildValue();
            return;
        }
        value = value.toString().replace(/\s/g, ''); // remove whitespace
        Array.from(value).forEach((c, idx) => {
            if (this.otpForm.get(this.getControlName(idx))) {
                this.otpForm.get(this.getControlName(idx))?.setValue(c);
            }
        });
        if (!this.config.disableAutoFocus) {
            const containerItem = document.getElementById(`c_${this.componentKey}`);
            var indexOfElementToFocus = value.length < this.config.length
                ? value.length
                : this.config.length - 1;
            let ele = containerItem?.getElementsByClassName('otp-input')[indexOfElementToFocus];
            if (ele && ele.focus) {
                ele.focus();
            }
        }
        this.rebuildValue();
    }
    rebuildValue() {
        let val = '';
        this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
            if (this.otpForm.controls[k].value) {
                val += this.otpForm.controls[k].value;
            }
        });
        this.onInputChange.emit(val);
    }
    getInputType() {
        return this.config.isPasswordInput
            ? 'password'
            : this.config.allowNumbersOnly
                ? 'tel'
                : 'text';
    }
    // handlePaste(e: any) {
    //   // Get pasted data via clipboard API
    //   let clipboardData = e.clipboardData || (window as any['clipboardData']);
    //   if (clipboardData) {
    //     var pastedData = clipboardData.getData('Text');
    //   }
    //   // Stop data actually being pasted into div
    //   e.stopPropagation();
    //   e.preventDefault();
    //   if (!pastedData) {
    //     return;
    //   }
    //   this.setValue(pastedData);
    // }
    onCount(e) {
        if (e.action === 'done')
            this.isTimeDone = true;
    }
    resendCode(e) {
        this.onCountDown.emit(e);
        // this.
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OtpInputComponent, deps: [{ token: i1.KeysPipe }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0", type: OtpInputComponent, selector: "app-otp-input", inputs: { config: "config" }, outputs: { onInputChange: "onInputChange", onCountDown: "onCountDown" }, ngImport: i0, template: "<div class=\"flex items-center justify-center gap-36\">\r\n  <div\r\n    class=\"wrapper {{ config.containerClass }} \"\r\n    id=\"c_{{ componentKey }}\"\r\n    *ngIf=\"otpForm?.controls\"\r\n    [ngStyle]=\"config.containerStyles\"\r\n  >\r\n    <input\r\n      [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\"\r\n      [type]=\"inputType\"\r\n      numberOnly\r\n      [placeholder]=\"config.placeholder || ''\"\r\n      [ngStyle]=\"config.inputStyles\"\r\n      maxlength=\"1\"\r\n      class=\"otp-input {{ config.inputClass }}\"\r\n      autocomplete=\"off\"\r\n      *ngFor=\"let item of otpForm?.controls | keys; let i = index\"\r\n      [formControl]=\"otpForm.controls[item]\"\r\n      id=\"otp_{{ i }}_{{ componentKey }}\"\r\n      (keydown)=\"onKeyDown($event)\"\r\n      (keyup)=\"onKeyUp($event, i)\"\r\n    />\r\n  </div>\r\n</div>\r\n\r\n<div class=\"text-center text-sm text-gray-600 mt-9\">\r\n  <countdown [config]=\"{ leftTime: 5 }\" (event)=\"onCount($event)\"></countdown>\r\n</div>\r\n@if (isTimeDone) {\r\n<a\r\n  (click)=\"resendCode($event)\"\r\n  class=\"font-medium text-indigo-600 hover:text-indigo-500\"\r\n>\r\n  Recend Code ...\r\n</a>\r\n}\r\n", styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4.CountdownComponent, selector: "countdown", inputs: ["config", "render"], outputs: ["event"] }, { kind: "pipe", type: i1.KeysPipe, name: "keys" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OtpInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-otp-input', template: "<div class=\"flex items-center justify-center gap-36\">\r\n  <div\r\n    class=\"wrapper {{ config.containerClass }} \"\r\n    id=\"c_{{ componentKey }}\"\r\n    *ngIf=\"otpForm?.controls\"\r\n    [ngStyle]=\"config.containerStyles\"\r\n  >\r\n    <input\r\n      [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\"\r\n      [type]=\"inputType\"\r\n      numberOnly\r\n      [placeholder]=\"config.placeholder || ''\"\r\n      [ngStyle]=\"config.inputStyles\"\r\n      maxlength=\"1\"\r\n      class=\"otp-input {{ config.inputClass }}\"\r\n      autocomplete=\"off\"\r\n      *ngFor=\"let item of otpForm?.controls | keys; let i = index\"\r\n      [formControl]=\"otpForm.controls[item]\"\r\n      id=\"otp_{{ i }}_{{ componentKey }}\"\r\n      (keydown)=\"onKeyDown($event)\"\r\n      (keyup)=\"onKeyUp($event, i)\"\r\n    />\r\n  </div>\r\n</div>\r\n\r\n<div class=\"text-center text-sm text-gray-600 mt-9\">\r\n  <countdown [config]=\"{ leftTime: 5 }\" (event)=\"onCount($event)\"></countdown>\r\n</div>\r\n@if (isTimeDone) {\r\n<a\r\n  (click)=\"resendCode($event)\"\r\n  class=\"font-medium text-indigo-600 hover:text-indigo-500\"\r\n>\r\n  Recend Code ...\r\n</a>\r\n}\r\n", styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}\n"] }]
        }], ctorParameters: () => [{ type: i1.KeysPipe }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }], propDecorators: { config: [{
                type: Input
            }], onInputChange: [{
                type: Output
            }], onCountDown: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9hbGktbGliL3NyYy9saWIvb3RwL2NvbXBvbmVudHMvb3RwLWlucHV0L290cC1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jbGllbnQvYWxpLWxpYi9zcmMvbGliL290cC9jb21wb25lbnRzL290cC1pbnB1dC9vdHAtaW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVV4RCxNQUFNLE9BQU8saUJBQWlCO0lBYTVCLFlBQ1UsUUFBa0IsRUFDRyxVQUFlO1FBRHBDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDRyxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBZHJDLFdBQU0sR0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4QyxnREFBZ0Q7UUFDdEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVoRCxrQkFBYSxHQUFrQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELGlCQUFZLEdBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUUsZUFBVSxH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XG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFBMQVRGT1JNX0lELFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvY29uZmlnJztcclxuaW1wb3J0IHsgS2V5c1BpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9rZXlzLnBpcGUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1vdHAtaW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vdHAtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsOiAnLi9vdHAtaW5wdXQuY29tcG9uZW50LnNjc3MnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3RwSW5wdXRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNvbmZpZzogQ29uZmlnID0geyBsZW5ndGg6IDQgfTtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW91dHB1dC1vbi1wcmVmaXhcclxuICBAT3V0cHV0KCkgb25JbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBPdXRwdXQoKSBvbkNvdW50RG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIG90cEZvcm0hOiBhbnk7XHJcbiAgaW5wdXRDb250cm9sczogRm9ybUNvbnRyb2xbXSA9IG5ldyBBcnJheSh0aGlzLmNvbmZpZy5sZW5ndGgpO1xyXG4gIGNvbXBvbmVudEtleSA9XHJcbiAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMikgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygzNik7XHJcbiAgaW5wdXRUeXBlITogc3RyaW5nO1xyXG4gIGlzVGltZURvbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuIFxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUga2V5c1BpcGU6IEtleXNQaXBlLFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnlcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5vdHBGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5jb25maWcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMub3RwRm9ybS5hZGRDb250cm9sKHRoaXMuZ2V0Q29udHJvbE5hbWUoaW5kZXgpLCBuZXcgRm9ybUNvbnRyb2woKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlucHV0VHlwZSA9IHRoaXMuZ2V0SW5wdXRUeXBlKCk7XHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZUF1dG9Gb2N1cyAmJiBkb2N1bWVudCkge1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lckl0ZW0gPSBkb2N1bWVudD8uZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAvLyAgICAgICBgY18ke3RoaXMuY29tcG9uZW50S2V5fWBcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICAgIGlmIChjb250YWluZXJJdGVtKSB7XHJcbiAgICAvLyAgICAgICBjb250YWluZXJJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgKGV2dCkgPT5cclxuICAgIC8vICAgICAgICAgLy8gdGhpcy5oYW5kbGVQYXN0ZShldnQpXHJcbiAgICAvLyAgICAgICAvLyApO1xyXG4gICAgLy8gICAgICAgY29uc3QgZWxlOiBhbnkgPSBjb250YWluZXJJdGVtLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ290cC1pbnB1dCcpWzBdO1xyXG4gICAgLy8gICAgICAgaWYgKGVsZSAmJiBlbGUuZm9jdXMpIHtcclxuICAgIC8vICAgICAgICAgZWxlLmZvY3VzKCk7XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0Q29udHJvbE5hbWUoaWR4OiBhbnkpIHtcclxuICAgIHJldHVybiBgY3RybF8ke2lkeH1gO1xyXG4gIH1cclxuXHJcbiAgaWZMZWZ0QXJyb3coZXZlbnQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWZLZXlDb2RlKGV2ZW50LCAzNyk7XHJcbiAgfVxyXG5cclxuICBpZlJpZ2h0QXJyb3coZXZlbnQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWZLZXlDb2RlKGV2ZW50LCAzOSk7XHJcbiAgfVxyXG5cclxuICBpZkJhY2tzcGFjZU9yRGVsZXRlKGV2ZW50OiBhbnkpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScgfHxcclxuICAgICAgZXZlbnQua2V5ID09PSAnRGVsZXRlJyB8fFxyXG4gICAgICB0aGlzLmlmS2V5Q29kZShldmVudCwgOCkgfHxcclxuICAgICAgdGhpcy5pZktleUNvZGUoZXZlbnQsIDQ2KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmS2V5Q29kZShldmVudDogYW55LCB0YXJnZXRDb2RlOiBhbnkpIHtcclxuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQuY2hhckNvZGU7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRyaXBsZS1lcXVhbHNcclxuICAgIHJldHVybiBrZXkgPT0gdGFyZ2V0Q29kZSA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgb25LZXlEb3duKCRldmVudDogYW55KTogYW55IHtcclxuICAgIHZhciBpc1NwYWNlID0gdGhpcy5pZktleUNvZGUoJGV2ZW50LCAzMik7XHJcbiAgICBpZiAoaXNTcGFjZSkge1xyXG4gICAgICAvLyBwcmV2ZW50IHNwYWNlXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uS2V5VXAoJGV2ZW50OiBhbnksIGlucHV0SWR4OiBhbnkpIHtcclxuICAgIGNvbnN0IG5leHRJbnB1dElkID0gdGhpcy5hcHBlbmRLZXkoYG90cF8ke2lucHV0SWR4ICsgMX1gKTtcclxuICAgIGNvbnN0IHByZXZJbnB1dElkID0gdGhpcy5hcHBlbmRLZXkoYG90cF8ke2lucHV0SWR4IC0gMX1gKTtcclxuICAgIGlmICh0aGlzLmlmUmlnaHRBcnJvdygkZXZlbnQpKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQobmV4dElucHV0SWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pZkxlZnRBcnJvdygkZXZlbnQpKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQocHJldklucHV0SWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc0JhY2tzcGFjZSA9IHRoaXMuaWZCYWNrc3BhY2VPckRlbGV0ZSgkZXZlbnQpO1xyXG4gICAgaWYgKGlzQmFja3NwYWNlICYmICEkZXZlbnQudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQocHJldklucHV0SWQpO1xyXG4gICAgICB0aGlzLnJlYnVpbGRWYWx1ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoISRldmVudC50YXJnZXQudmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaWZWYWxpZEVudHJ5KCRldmVudCkpIHtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXh0SW5wdXRJZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlYnVpbGRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXBwZW5kS2V5KGlkOiBhbnkpIHtcclxuICAgIHJldHVybiBgJHtpZH1fJHt0aGlzLmNvbXBvbmVudEtleX1gO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWQoZWxlSWQ6IGFueSkge1xyXG4gICAgdGhpcy5mb2N1c1RvKGVsZUlkKTtcclxuICAgIGNvbnN0IGVsZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlSWQpO1xyXG4gICAgaWYgKGVsZSAmJiBlbGUuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZWxlLnNldFNlbGVjdGlvblJhbmdlKDAsIDEpO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmVmFsaWRFbnRyeShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBpbnAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmtleUNvZGUpO1xyXG4gICAgY29uc3QgaXNNb2JpbGUgPSAvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGlzTW9iaWxlIHx8XHJcbiAgICAgIC9bYS16QS1aMC05LV9dLy50ZXN0KGlucCkgfHxcclxuICAgICAgKHRoaXMuY29uZmlnLmFsbG93S2V5Q29kZXMgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZy5hbGxvd0tleUNvZGVzLmluY2x1ZGVzKGV2ZW50LmtleUNvZGUpKSB8fFxyXG4gICAgICAoZXZlbnQua2V5Q29kZSA+PSA5NiAmJiBldmVudC5rZXlDb2RlIDw9IDEwNSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmb2N1c1RvKGVsZUlkOiBhbnkpIHtcclxuICAgIGNvbnN0IGVsZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlSWQpO1xyXG4gICAgaWYgKGVsZSkge1xyXG4gICAgICBlbGUuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIG1ldGhvZCB0byBzZXQgY29tcG9uZW50IHZhbHVlXHJcbiAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmFsbG93TnVtYmVyc09ubHkgJiYgaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMub3RwRm9ybS5yZXNldCgpO1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICB0aGlzLnJlYnVpbGRWYWx1ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxzL2csICcnKTsgLy8gcmVtb3ZlIHdoaXRlc3BhY2VcclxuICAgIEFycmF5LmZyb20odmFsdWUpLmZvckVhY2goKGMsIGlkeCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5vdHBGb3JtLmdldCh0aGlzLmdldENvbnRyb2xOYW1lKGlkeCkpKSB7XHJcbiAgICAgICAgdGhpcy5vdHBGb3JtLmdldCh0aGlzLmdldENvbnRyb2xOYW1lKGlkeCkpPy5zZXRWYWx1ZShjKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLmRpc2FibGVBdXRvRm9jdXMpIHtcclxuICAgICAgY29uc3QgY29udGFpbmVySXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjXyR7dGhpcy5jb21wb25lbnRLZXl9YCk7XHJcbiAgICAgIHZhciBpbmRleE9mRWxlbWVudFRvRm9jdXMgPVxyXG4gICAgICAgIHZhbHVlLmxlbmd0aCA8IHRoaXMuY29uZmlnLmxlbmd0aFxyXG4gICAgICAgICAgPyB2YWx1ZS5sZW5ndGhcclxuICAgICAgICAgIDogdGhpcy5jb25maWcubGVuZ3RoIC0gMTtcclxuICAgICAgbGV0IGVsZTogYW55ID1cclxuICAgICAgICBjb250YWluZXJJdGVtPy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvdHAtaW5wdXQnKVtcclxuICAgICAgICAgIGluZGV4T2ZFbGVtZW50VG9Gb2N1c1xyXG4gICAgICAgIF07XHJcbiAgICAgIGlmIChlbGUgJiYgZWxlLmZvY3VzKSB7XHJcbiAgICAgICAgZWxlLmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVidWlsZFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICByZWJ1aWxkVmFsdWUoKSB7XHJcbiAgICBsZXQgdmFsID0gJyc7XHJcbiAgICB0aGlzLmtleXNQaXBlLnRyYW5zZm9ybSh0aGlzLm90cEZvcm0uY29udHJvbHMpLmZvckVhY2goKGspID0+IHtcclxuICAgICAgaWYgKHRoaXMub3RwRm9ybS5jb250cm9sc1trXS52YWx1ZSkge1xyXG4gICAgICAgIHZhbCArPSB0aGlzLm90cEZvcm0uY29udHJvbHNba10udmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbklucHV0Q2hhbmdlLmVtaXQodmFsKTtcclxuICB9XHJcbiAgZ2V0SW5wdXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWcuaXNQYXNzd29yZElucHV0XHJcbiAgICAgID8gJ3Bhc3N3b3JkJ1xyXG4gICAgICA6IHRoaXMuY29uZmlnLmFsbG93TnVtYmVyc09ubHlcclxuICAgICAgPyAndGVsJ1xyXG4gICAgICA6ICd0ZXh0JztcclxuICB9XHJcbiAgLy8gaGFuZGxlUGFzdGUoZTogYW55KSB7XHJcbiAgLy8gICAvLyBHZXQgcGFzdGVkIGRhdGEgdmlhIGNsaXBib2FyZCBBUElcclxuICAvLyAgIGxldCBjbGlwYm9hcmREYXRhID0gZS5jbGlwYm9hcmREYXRhIHx8ICh3aW5kb3cgYXMgYW55WydjbGlwYm9hcmREYXRhJ10pO1xyXG4gIC8vICAgaWYgKGNsaXBib2FyZERhdGEpIHtcclxuICAvLyAgICAgdmFyIHBhc3RlZERhdGEgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuICAvLyAgIH1cclxuICAvLyAgIC8vIFN0b3AgZGF0YSBhY3R1YWxseSBiZWluZyBwYXN0ZWQgaW50byBkaXZcclxuICAvLyAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgLy8gICBpZiAoIXBhc3RlZERhdGEpIHtcclxuICAvLyAgICAgcmV0dXJuO1xyXG4gIC8vICAgfVxyXG4gIC8vICAgdGhpcy5zZXRWYWx1ZShwYXN0ZWREYXRhKTtcclxuICAvLyB9XHJcblxyXG4gIG9uQ291bnQoZTogYW55KSB7XHJcbiAgICBpZiAoZS5hY3Rpb24gPT09ICdkb25lJykgdGhpcy5pc1RpbWVEb25lID0gdHJ1ZTtcclxuICB9XHJcbiAgcmVzZW5kQ29kZShlOkV2ZW50KXtcclxuICAgIHRoaXMub25Db3VudERvd24uZW1pdChlKVxyXG4gICAgLy8gdGhpcy5cclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zNlwiPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwid3JhcHBlciB7eyBjb25maWcuY29udGFpbmVyQ2xhc3MgfX0gXCJcclxuICAgIGlkPVwiY197eyBjb21wb25lbnRLZXkgfX1cIlxyXG4gICAgKm5nSWY9XCJvdHBGb3JtPy5jb250cm9sc1wiXHJcbiAgICBbbmdTdHlsZV09XCJjb25maWcuY29udGFpbmVyU3R5bGVzXCJcclxuICA+XHJcbiAgICA8aW5wdXRcclxuICAgICAgW3BhdHRlcm5dPVwiY29uZmlnLmFsbG93TnVtYmVyc09ubHkgPyAnXFxcXGQqJyA6ICcnXCJcclxuICAgICAgW3R5cGVdPVwiaW5wdXRUeXBlXCJcclxuICAgICAgbnVtYmVyT25seVxyXG4gICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLnBsYWNlaG9sZGVyIHx8ICcnXCJcclxuICAgICAgW25nU3R5bGVdPVwiY29uZmlnLmlucHV0U3R5bGVzXCJcclxuICAgICAgbWF4bGVuZ3RoPVwiMVwiXHJcbiAgICAgIGNsYXNzPVwib3RwLWlucHV0IHt7IGNvbmZpZy5pbnB1dENsYXNzIH19XCJcclxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcclxuICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3RwRm9ybT8uY29udHJvbHMgfCBrZXlzOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgW2Zvcm1Db250cm9sXT1cIm90cEZvcm0uY29udHJvbHNbaXRlbV1cIlxyXG4gICAgICBpZD1cIm90cF97eyBpIH19X3t7IGNvbXBvbmVudEtleSB9fVwiXHJcbiAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcclxuICAgICAgKGtleXVwKT1cIm9uS2V5VXAoJGV2ZW50LCBpKVwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LXNtIHRleHQtZ3JheS02MDAgbXQtOVwiPlxyXG4gIDxjb3VudGRvd24gW2NvbmZpZ109XCJ7IGxlZnRUaW1lOiA1IH1cIiAoZXZlbnQpPVwib25Db3VudCgkZXZlbnQpXCI+PC9jb3VudGRvd24+XHJcbjwvZGl2PlxyXG5AaWYgKGlzVGltZURvbmUpIHtcclxuPGFcclxuICAoY2xpY2spPVwicmVzZW5kQ29kZSgkZXZlbnQpXCJcclxuICBjbGFzcz1cImZvbnQtbWVkaXVtIHRleHQtaW5kaWdvLTYwMCBob3Zlcjp0ZXh0LWluZGlnby01MDBcIlxyXG4+XHJcbiAgUmVjZW5kIENvZGUgLi4uXHJcbjwvYT5cclxufVxyXG4iXX0=