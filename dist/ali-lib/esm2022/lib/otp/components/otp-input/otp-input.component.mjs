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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0", type: OtpInputComponent, selector: "app-otp-input", inputs: { config: "config" }, outputs: { onInputChange: "onInputChange", onCountDown: "onCountDown" }, ngImport: i0, template: "<div class=\"flex items-center justify-center gap-36\">\n  <div\n    class=\"wrapper {{ config.containerClass }} \"\n    id=\"c_{{ componentKey }}\"\n    *ngIf=\"otpForm?.controls\"\n    [ngStyle]=\"config.containerStyles\"\n  >\n    <input\n      [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\"\n      [type]=\"inputType\"\n      numberOnly\n      [placeholder]=\"config.placeholder || ''\"\n      [ngStyle]=\"config.inputStyles\"\n      maxlength=\"1\"\n      class=\"otp-input {{ config.inputClass }}\"\n      autocomplete=\"off\"\n      *ngFor=\"let item of otpForm?.controls | keys; let i = index\"\n      [formControl]=\"otpForm.controls[item]\"\n      id=\"otp_{{ i }}_{{ componentKey }}\"\n      (keydown)=\"onKeyDown($event)\"\n      (keyup)=\"onKeyUp($event, i)\"\n    />\n  </div>\n</div>\n\n<div class=\"text-center text-sm text-gray-600 mt-9\">\n  <countdown [config]=\"{ leftTime: 5 }\" (event)=\"onCount($event)\"></countdown>\n</div>\n@if (isTimeDone) {\n<a\n  (click)=\"resendCode($event)\"\n  class=\"font-medium text-indigo-600 hover:text-indigo-500\"\n>\n  Recend Code ...\n</a>\n}\n", styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4.CountdownComponent, selector: "countdown", inputs: ["config", "render"], outputs: ["event"] }, { kind: "pipe", type: i1.KeysPipe, name: "keys" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OtpInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-otp-input', template: "<div class=\"flex items-center justify-center gap-36\">\n  <div\n    class=\"wrapper {{ config.containerClass }} \"\n    id=\"c_{{ componentKey }}\"\n    *ngIf=\"otpForm?.controls\"\n    [ngStyle]=\"config.containerStyles\"\n  >\n    <input\n      [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\"\n      [type]=\"inputType\"\n      numberOnly\n      [placeholder]=\"config.placeholder || ''\"\n      [ngStyle]=\"config.inputStyles\"\n      maxlength=\"1\"\n      class=\"otp-input {{ config.inputClass }}\"\n      autocomplete=\"off\"\n      *ngFor=\"let item of otpForm?.controls | keys; let i = index\"\n      [formControl]=\"otpForm.controls[item]\"\n      id=\"otp_{{ i }}_{{ componentKey }}\"\n      (keydown)=\"onKeyDown($event)\"\n      (keyup)=\"onKeyUp($event, i)\"\n    />\n  </div>\n</div>\n\n<div class=\"text-center text-sm text-gray-600 mt-9\">\n  <countdown [config]=\"{ leftTime: 5 }\" (event)=\"onCount($event)\"></countdown>\n</div>\n@if (isTimeDone) {\n<a\n  (click)=\"resendCode($event)\"\n  class=\"font-medium text-indigo-600 hover:text-indigo-500\"\n>\n  Recend Code ...\n</a>\n}\n", styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9hbGktbGliL3NyYy9saWIvb3RwL2NvbXBvbmVudHMvb3RwLWlucHV0L290cC1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jbGllbnQvYWxpLWxpYi9zcmMvbGliL290cC9jb21wb25lbnRzL290cC1pbnB1dC9vdHAtaW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVV4RCxNQUFNLE9BQU8saUJBQWlCO0lBYTVCLFlBQ1UsUUFBa0IsRUFDRyxVQUFlO1FBRHBDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDRyxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBZHJDLFdBQU0sR0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4QyxnREFBZ0Q7UUFDdEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVoRCxrQkFBYSxHQUFrQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELGlCQUFZLEdBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUUsZUFBVSxH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RXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvY29uZmlnJztcbmltcG9ydCB7IEtleXNQaXBlIH0gZnJvbSAnLi4vLi4vcGlwZXMva2V5cy5waXBlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW90cC1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9vdHAtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vb3RwLWlucHV0LmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgT3RwSW5wdXRDb21wb25lbnQge1xuICBASW5wdXQoKSBjb25maWc6IENvbmZpZyA9IHsgbGVuZ3RoOiA0IH07XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25JbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgb25Db3VudERvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgb3RwRm9ybSE6IGFueTtcbiAgaW5wdXRDb250cm9sczogRm9ybUNvbnRyb2xbXSA9IG5ldyBBcnJheSh0aGlzLmNvbmZpZy5sZW5ndGgpO1xuICBjb21wb25lbnRLZXkgPVxuICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKSArIG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKDM2KTtcbiAgaW5wdXRUeXBlITogc3RyaW5nO1xuICBpc1RpbWVEb25lOiBib29sZWFuID0gZmFsc2U7XG4gXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBrZXlzUGlwZTogS2V5c1BpcGUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3RwRm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmNvbmZpZy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMub3RwRm9ybS5hZGRDb250cm9sKHRoaXMuZ2V0Q29udHJvbE5hbWUoaW5kZXgpLCBuZXcgRm9ybUNvbnRyb2woKSk7XG4gICAgfVxuICAgIHRoaXMuaW5wdXRUeXBlID0gdGhpcy5nZXRJbnB1dFR5cGUoKTtcbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAvLyAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZUF1dG9Gb2N1cyAmJiBkb2N1bWVudCkge1xuICAgIC8vICAgICBjb25zdCBjb250YWluZXJJdGVtID0gZG9jdW1lbnQ/LmdldEVsZW1lbnRCeUlkKFxuICAgIC8vICAgICAgIGBjXyR7dGhpcy5jb21wb25lbnRLZXl9YFxuICAgIC8vICAgICApO1xuICAgIC8vICAgICBpZiAoY29udGFpbmVySXRlbSkge1xuICAgIC8vICAgICAgIGNvbnRhaW5lckl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoZXZ0KSA9PlxuICAgIC8vICAgICAgICAgLy8gdGhpcy5oYW5kbGVQYXN0ZShldnQpXG4gICAgLy8gICAgICAgLy8gKTtcbiAgICAvLyAgICAgICBjb25zdCBlbGU6IGFueSA9IGNvbnRhaW5lckl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3RwLWlucHV0JylbMF07XG4gICAgLy8gICAgICAgaWYgKGVsZSAmJiBlbGUuZm9jdXMpIHtcbiAgICAvLyAgICAgICAgIGVsZS5mb2N1cygpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuICBwcml2YXRlIGdldENvbnRyb2xOYW1lKGlkeDogYW55KSB7XG4gICAgcmV0dXJuIGBjdHJsXyR7aWR4fWA7XG4gIH1cblxuICBpZkxlZnRBcnJvdyhldmVudDogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaWZLZXlDb2RlKGV2ZW50LCAzNyk7XG4gIH1cblxuICBpZlJpZ2h0QXJyb3coZXZlbnQ6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlmS2V5Q29kZShldmVudCwgMzkpO1xuICB9XG5cbiAgaWZCYWNrc3BhY2VPckRlbGV0ZShldmVudDogYW55KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScgfHxcbiAgICAgIGV2ZW50LmtleSA9PT0gJ0RlbGV0ZScgfHxcbiAgICAgIHRoaXMuaWZLZXlDb2RlKGV2ZW50LCA4KSB8fFxuICAgICAgdGhpcy5pZktleUNvZGUoZXZlbnQsIDQ2KVxuICAgICk7XG4gIH1cblxuICBpZktleUNvZGUoZXZlbnQ6IGFueSwgdGFyZ2V0Q29kZTogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC5jaGFyQ29kZTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRyaXBsZS1lcXVhbHNcbiAgICByZXR1cm4ga2V5ID09IHRhcmdldENvZGUgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgb25LZXlEb3duKCRldmVudDogYW55KTogYW55IHtcbiAgICB2YXIgaXNTcGFjZSA9IHRoaXMuaWZLZXlDb2RlKCRldmVudCwgMzIpO1xuICAgIGlmIChpc1NwYWNlKSB7XG4gICAgICAvLyBwcmV2ZW50IHNwYWNlXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb25LZXlVcCgkZXZlbnQ6IGFueSwgaW5wdXRJZHg6IGFueSkge1xuICAgIGNvbnN0IG5leHRJbnB1dElkID0gdGhpcy5hcHBlbmRLZXkoYG90cF8ke2lucHV0SWR4ICsgMX1gKTtcbiAgICBjb25zdCBwcmV2SW5wdXRJZCA9IHRoaXMuYXBwZW5kS2V5KGBvdHBfJHtpbnB1dElkeCAtIDF9YCk7XG4gICAgaWYgKHRoaXMuaWZSaWdodEFycm93KCRldmVudCkpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQobmV4dElucHV0SWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pZkxlZnRBcnJvdygkZXZlbnQpKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkKHByZXZJbnB1dElkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXNCYWNrc3BhY2UgPSB0aGlzLmlmQmFja3NwYWNlT3JEZWxldGUoJGV2ZW50KTtcbiAgICBpZiAoaXNCYWNrc3BhY2UgJiYgISRldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQocHJldklucHV0SWQpO1xuICAgICAgdGhpcy5yZWJ1aWxkVmFsdWUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEkZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlmVmFsaWRFbnRyeSgkZXZlbnQpKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkKG5leHRJbnB1dElkKTtcbiAgICB9XG4gICAgdGhpcy5yZWJ1aWxkVmFsdWUoKTtcbiAgfVxuXG4gIGFwcGVuZEtleShpZDogYW55KSB7XG4gICAgcmV0dXJuIGAke2lkfV8ke3RoaXMuY29tcG9uZW50S2V5fWA7XG4gIH1cblxuICBzZXRTZWxlY3RlZChlbGVJZDogYW55KSB7XG4gICAgdGhpcy5mb2N1c1RvKGVsZUlkKTtcbiAgICBjb25zdCBlbGU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZUlkKTtcbiAgICBpZiAoZWxlICYmIGVsZS5zZXRTZWxlY3Rpb25SYW5nZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZS5zZXRTZWxlY3Rpb25SYW5nZSgwLCAxKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGlmVmFsaWRFbnRyeShldmVudDogYW55KSB7XG4gICAgY29uc3QgaW5wID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlKTtcbiAgICBjb25zdCBpc01vYmlsZSA9IC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHJldHVybiAoXG4gICAgICBpc01vYmlsZSB8fFxuICAgICAgL1thLXpBLVowLTktX10vLnRlc3QoaW5wKSB8fFxuICAgICAgKHRoaXMuY29uZmlnLmFsbG93S2V5Q29kZXMgJiZcbiAgICAgICAgdGhpcy5jb25maWcuYWxsb3dLZXlDb2Rlcy5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkgfHxcbiAgICAgIChldmVudC5rZXlDb2RlID49IDk2ICYmIGV2ZW50LmtleUNvZGUgPD0gMTA1KVxuICAgICk7XG4gIH1cblxuICBmb2N1c1RvKGVsZUlkOiBhbnkpIHtcbiAgICBjb25zdCBlbGU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZUlkKTtcbiAgICBpZiAoZWxlKSB7XG4gICAgICBlbGUuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBtZXRob2QgdG8gc2V0IGNvbXBvbmVudCB2YWx1ZVxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmFsbG93TnVtYmVyc09ubHkgJiYgaXNOYU4odmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3RwRm9ybS5yZXNldCgpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMucmVidWlsZFZhbHVlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHMvZywgJycpOyAvLyByZW1vdmUgd2hpdGVzcGFjZVxuICAgIEFycmF5LmZyb20odmFsdWUpLmZvckVhY2goKGMsIGlkeCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3RwRm9ybS5nZXQodGhpcy5nZXRDb250cm9sTmFtZShpZHgpKSkge1xuICAgICAgICB0aGlzLm90cEZvcm0uZ2V0KHRoaXMuZ2V0Q29udHJvbE5hbWUoaWR4KSk/LnNldFZhbHVlKGMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZUF1dG9Gb2N1cykge1xuICAgICAgY29uc3QgY29udGFpbmVySXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjXyR7dGhpcy5jb21wb25lbnRLZXl9YCk7XG4gICAgICB2YXIgaW5kZXhPZkVsZW1lbnRUb0ZvY3VzID1cbiAgICAgICAgdmFsdWUubGVuZ3RoIDwgdGhpcy5jb25maWcubGVuZ3RoXG4gICAgICAgICAgPyB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICA6IHRoaXMuY29uZmlnLmxlbmd0aCAtIDE7XG4gICAgICBsZXQgZWxlOiBhbnkgPVxuICAgICAgICBjb250YWluZXJJdGVtPy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvdHAtaW5wdXQnKVtcbiAgICAgICAgICBpbmRleE9mRWxlbWVudFRvRm9jdXNcbiAgICAgICAgXTtcbiAgICAgIGlmIChlbGUgJiYgZWxlLmZvY3VzKSB7XG4gICAgICAgIGVsZS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlYnVpbGRWYWx1ZSgpO1xuICB9XG5cbiAgcmVidWlsZFZhbHVlKCkge1xuICAgIGxldCB2YWwgPSAnJztcbiAgICB0aGlzLmtleXNQaXBlLnRyYW5zZm9ybSh0aGlzLm90cEZvcm0uY29udHJvbHMpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmICh0aGlzLm90cEZvcm0uY29udHJvbHNba10udmFsdWUpIHtcbiAgICAgICAgdmFsICs9IHRoaXMub3RwRm9ybS5jb250cm9sc1trXS52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uSW5wdXRDaGFuZ2UuZW1pdCh2YWwpO1xuICB9XG4gIGdldElucHV0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5pc1Bhc3N3b3JkSW5wdXRcbiAgICAgID8gJ3Bhc3N3b3JkJ1xuICAgICAgOiB0aGlzLmNvbmZpZy5hbGxvd051bWJlcnNPbmx5XG4gICAgICA/ICd0ZWwnXG4gICAgICA6ICd0ZXh0JztcbiAgfVxuICAvLyBoYW5kbGVQYXN0ZShlOiBhbnkpIHtcbiAgLy8gICAvLyBHZXQgcGFzdGVkIGRhdGEgdmlhIGNsaXBib2FyZCBBUElcbiAgLy8gICBsZXQgY2xpcGJvYXJkRGF0YSA9IGUuY2xpcGJvYXJkRGF0YSB8fCAod2luZG93IGFzIGFueVsnY2xpcGJvYXJkRGF0YSddKTtcbiAgLy8gICBpZiAoY2xpcGJvYXJkRGF0YSkge1xuICAvLyAgICAgdmFyIHBhc3RlZERhdGEgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcbiAgLy8gICB9XG4gIC8vICAgLy8gU3RvcCBkYXRhIGFjdHVhbGx5IGJlaW5nIHBhc3RlZCBpbnRvIGRpdlxuICAvLyAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGlmICghcGFzdGVkRGF0YSkge1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB0aGlzLnNldFZhbHVlKHBhc3RlZERhdGEpO1xuICAvLyB9XG5cbiAgb25Db3VudChlOiBhbnkpIHtcbiAgICBpZiAoZS5hY3Rpb24gPT09ICdkb25lJykgdGhpcy5pc1RpbWVEb25lID0gdHJ1ZTtcbiAgfVxuICByZXNlbmRDb2RlKGU6RXZlbnQpe1xuICAgIHRoaXMub25Db3VudERvd24uZW1pdChlKVxuICAgIC8vIHRoaXMuXG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMzZcIj5cbiAgPGRpdlxuICAgIGNsYXNzPVwid3JhcHBlciB7eyBjb25maWcuY29udGFpbmVyQ2xhc3MgfX0gXCJcbiAgICBpZD1cImNfe3sgY29tcG9uZW50S2V5IH19XCJcbiAgICAqbmdJZj1cIm90cEZvcm0/LmNvbnRyb2xzXCJcbiAgICBbbmdTdHlsZV09XCJjb25maWcuY29udGFpbmVyU3R5bGVzXCJcbiAgPlxuICAgIDxpbnB1dFxuICAgICAgW3BhdHRlcm5dPVwiY29uZmlnLmFsbG93TnVtYmVyc09ubHkgPyAnXFxcXGQqJyA6ICcnXCJcbiAgICAgIFt0eXBlXT1cImlucHV0VHlwZVwiXG4gICAgICBudW1iZXJPbmx5XG4gICAgICBbcGxhY2Vob2xkZXJdPVwiY29uZmlnLnBsYWNlaG9sZGVyIHx8ICcnXCJcbiAgICAgIFtuZ1N0eWxlXT1cImNvbmZpZy5pbnB1dFN0eWxlc1wiXG4gICAgICBtYXhsZW5ndGg9XCIxXCJcbiAgICAgIGNsYXNzPVwib3RwLWlucHV0IHt7IGNvbmZpZy5pbnB1dENsYXNzIH19XCJcbiAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdHBGb3JtPy5jb250cm9scyB8IGtleXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cIm90cEZvcm0uY29udHJvbHNbaXRlbV1cIlxuICAgICAgaWQ9XCJvdHBfe3sgaSB9fV97eyBjb21wb25lbnRLZXkgfX1cIlxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgKGtleXVwKT1cIm9uS2V5VXAoJGV2ZW50LCBpKVwiXG4gICAgLz5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtc20gdGV4dC1ncmF5LTYwMCBtdC05XCI+XG4gIDxjb3VudGRvd24gW2NvbmZpZ109XCJ7IGxlZnRUaW1lOiA1IH1cIiAoZXZlbnQpPVwib25Db3VudCgkZXZlbnQpXCI+PC9jb3VudGRvd24+XG48L2Rpdj5cbkBpZiAoaXNUaW1lRG9uZSkge1xuPGFcbiAgKGNsaWNrKT1cInJlc2VuZENvZGUoJGV2ZW50KVwiXG4gIGNsYXNzPVwiZm9udC1tZWRpdW0gdGV4dC1pbmRpZ28tNjAwIGhvdmVyOnRleHQtaW5kaWdvLTUwMFwiXG4+XG4gIFJlY2VuZCBDb2RlIC4uLlxuPC9hPlxufVxuIl19