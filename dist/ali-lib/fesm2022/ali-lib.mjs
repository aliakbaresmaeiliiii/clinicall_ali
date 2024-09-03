import * as i0 from '@angular/core';
import { Injectable, Component, EventEmitter, ChangeDetectionStrategy, Input, Output, HostListener, HostBinding, ContentChildren, NgModule, Pipe, PLATFORM_ID, Inject, Directive } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import * as i2$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i4 from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';

class AliService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: AliService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: AliService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: AliService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class AliComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: AliComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0", type: AliComponent, isStandalone: true, selector: "lib-ali", ngImport: i0, template: `
    <p>
      ali works!
    </p>
  `, isInline: true, styles: [""] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: AliComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ali', standalone: true, imports: [], template: `
    <p>
      ali works!
    </p>
  ` }]
        }] });

class RatingPickerComponent {
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
        ], usesOnChanges: true, ngImport: i0, template: "<ul class=\"rating-options\" [ngClass]=\"{ disabled: disabled }\">\n  <li [ngClass]=\"{ active: value === 'great' }\" (click)=\"setValue('great')\">\uD83D\uDC4C</li>\n  <li [ngClass]=\"{ active: value === 'good' }\" (click)=\"setValue('good')\">\uD83D\uDE0A</li>\n  <li [ngClass]=\"{ active: value === 'neutral' }\" (click)=\"setValue('neutral')\">\uD83D\uDE10</li>\n  <li [ngClass]=\"{ active: value === 'bad' }\" (click)=\"setValue('bad')\">\uD83E\uDD7A</li>\n</ul>\n", styles: [":host{width:100%;display:block;border-radius:var(--border-radius, 8px)}.rating-options{margin:0;padding:var(--spacing-step, 4px);list-style:none;display:flex;box-sizing:border-box;min-width:200px;justify-content:space-between;background-color:var(--color-picker-background, #fff);border-radius:var(--border-radius, 8px)}.rating-options.disabled{opacity:.5;pointer-events:none}.rating-options li{padding:15px 13px;border-radius:var(--border-radius, 8px);cursor:pointer;box-sizing:border-box;font-size:var(--font-size-picker-option, 26px)}.rating-options li:hover,.rating-options li.active{background-color:var(--color-picker-bg-active, #daeefa)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
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

class OptionComponent {
    constructor() {
        this.value = null;
        this.disableReason = '';
        this.disabled = false;
        this.selected = new EventEmitter();
        this.isSelected = false;
    }
    select() {
        if (!this.disabled) {
            this.highlightAsSelected();
            this.selected.emit(this);
        }
    }
    ngOnInit() { }
    highlightAsSelected() {
        this.isSelected = true;
    }
    deselect() {
        this.isSelected = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0", type: OptionComponent, selector: "lib-option", inputs: { value: "value", disableReason: "disableReason", disabled: "disabled" }, outputs: { selected: "selected" }, host: { listeners: { "click": "select()" }, properties: { "class.disabled": "this.disabled", "class.selected": "this.isSelected" } }, ngImport: i0, template: "<div class=\"option-content\">\n    <ng-content></ng-content>\n</div>\n@if (disableReason) {\n    <div class=\"disable-reason\">{{disableReason}}</div>\n}", styles: ["@charset \"UTF-8\";:host{display:flex;align-items:center;height:34px;padding:5px 10px;box-sizing:border-box;font-size:14px;border:transparent 1px solid;cursor:pointer}:host:hover{background-color:var(--color-background, #e5f2f8)}:host.selected:before{content:\"\\2714\\fe0f\";animation:checked-option .32s ease-out;transform-origin:bottom left}:host.selected .option-content{transform:translate(7px)}:host.disabled{opacity:.5;pointer-events:none;border:var(--color-text-light) dashed 1px}.option-content{transition:transform .32s ease-out;width:100%}.disable-reason:not(:empty){font-size:8px;background-color:#d7d8d9;padding:1px 5px;white-space:nowrap}@keyframes checked-option{0%{opacity:.8;transform:scale(.9)}to{opacity:1;transform:scale(1)}}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-option', standalone: false, template: "<div class=\"option-content\">\n    <ng-content></ng-content>\n</div>\n@if (disableReason) {\n    <div class=\"disable-reason\">{{disableReason}}</div>\n}", styles: ["@charset \"UTF-8\";:host{display:flex;align-items:center;height:34px;padding:5px 10px;box-sizing:border-box;font-size:14px;border:transparent 1px solid;cursor:pointer}:host:hover{background-color:var(--color-background, #e5f2f8)}:host.selected:before{content:\"\\2714\\fe0f\";animation:checked-option .32s ease-out;transform-origin:bottom left}:host.selected .option-content{transform:translate(7px)}:host.disabled{opacity:.5;pointer-events:none;border:var(--color-text-light) dashed 1px}.option-content{transition:transform .32s ease-out;width:100%}.disable-reason:not(:empty){font-size:8px;background-color:#d7d8d9;padding:1px 5px;white-space:nowrap}@keyframes checked-option{0%{opacity:.8;transform:scale(.9)}to{opacity:1;transform:scale(1)}}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], disableReason: [{
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }], selected: [{
                type: Output
            }], select: [{
                type: HostListener,
                args: ['click']
            }], isSelected: [{
                type: HostBinding,
                args: ['class.selected']
            }] } });

class SelectComponent {
    set value(value) {
        this.selectionModel.clear();
        if (value) {
            this.selectionModel.select(value);
        }
    }
    get value() {
        return this.selectionModel.selected[0] || null;
    }
    open() {
        this.isOpen = !this.isOpen;
    }
    close() {
        this.isOpen = false;
    }
    constructor() {
        this.label = '';
        this.selectionModel = new SelectionModel();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.isOpen = false;
    }
    ngAfterContentInit() {
        this.highlightSelectedOptions(this.value);
    }
    onPanelAnimationDone({ fromState, toState }) {
        if (fromState === 'void' && toState === null && this.isOpen) {
            this.opened.emit();
        }
        if (fromState === null && toState === 'void' && !this.isOpen) {
            this.closed.emit();
        }
    }
    highlightSelectedOptions(value) {
        this.findOptionsByValue(value)?.highlightAsSelected;
    }
    findOptionsByValue(value) {
        return this.options && this.options.find((o) => o.value === value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0", type: SelectComponent, selector: "lib-select", inputs: { label: "label", value: "value" }, outputs: { opened: "opened", closed: "closed" }, host: { listeners: { "click": "open()" } }, queries: [{ propertyName: "options", predicate: OptionComponent, descendants: true }], ngImport: i0, template: "<div class=\"label\">{{ label }}</div>\n<div class=\"control\" cdkOverlayOrigin #origin=\"cdkOverlayOrigin\">\n  <span class=\"selected-value\" [ngClass]=\"{ emty: !value }\">{{\n    value || \"Nothing is selected...\"\n  }}</span>\n  <span class=\"drop-down-icon\">\uD83D\uDC47</span>\n</div>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"isOpen\"\n  [cdkConne\n  ctedOverlayOffsetY]=\"8\"\n  [cdkConnectedOverlayOffsetX]=\"-11\"\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  (backdropClick)=\"close()\"\n  (detach)=\"close()\"\n>\n  <div\n    class=\"panel\"\n    [@dropDown]\n    (@dropDown.done)=\"onPanelAnimationDone($event)\"\n  >\n    <ng-content ></ng-content>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;justify-content:flex-start;flex-direction:column;border:var(--color-text, #ccc) solid 2px;padding:5px 10px;box-sizing:border-box;border-radius:var(--border-radius, 10px);min-width:250px}:host:hover{cursor:pointer;background-color:var(--color-background, #eceff1)}:host:hover .selected-value{transform:scale(.9)}:host.select-panel-open{position:relative;z-index:1001}:host.disabled{opacity:.5;pointer-events:none;-webkit-user-select:none;user-select:none}.label{font-size:13px;font-weight:800;color:var(--color-text)}.control{width:100%;display:flex;justify-content:space-between;align-items:center}.selected-value{font-size:16px;margin-right:15px;transition:transform .2s;transform-origin:left;width:100%}.selected-value.empty{opacity:.6}.select-search{border:none;padding:0;background:transparent;outline:none}.panel{min-width:250px;padding:5px 10px;box-sizing:border-box;border-radius:var(--border-radius, 10px);border:var(--color-text, #ccc) solid 2px;background-color:#fff;transform-origin:top;min-height:45px;max-height:180px;overflow:auto}.clear-button{font-size:10px;background-color:transparent;padding:1px 3px;border:none;width:40px;margin:0 3px;font-weight:300;opacity:.7}.clear-button:hover{background-color:var(--color-backgroud-darker, #cfd8dc);opacity:1}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], animations: [
            trigger('dropDown', [
                state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
                state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
                transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
                transition(':leave', [
                    animate('420ms cubic-bezier(0.88,-0.7, 0.86, 0.85)'),
                ]),
            ]),
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-select', standalone: false, animations: [
                        trigger('dropDown', [
                            state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
                            state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
                            transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
                            transition(':leave', [
                                animate('420ms cubic-bezier(0.88,-0.7, 0.86, 0.85)'),
                            ]),
                        ]),
                    ], template: "<div class=\"label\">{{ label }}</div>\n<div class=\"control\" cdkOverlayOrigin #origin=\"cdkOverlayOrigin\">\n  <span class=\"selected-value\" [ngClass]=\"{ emty: !value }\">{{\n    value || \"Nothing is selected...\"\n  }}</span>\n  <span class=\"drop-down-icon\">\uD83D\uDC47</span>\n</div>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"isOpen\"\n  [cdkConne\n  ctedOverlayOffsetY]=\"8\"\n  [cdkConnectedOverlayOffsetX]=\"-11\"\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  (backdropClick)=\"close()\"\n  (detach)=\"close()\"\n>\n  <div\n    class=\"panel\"\n    [@dropDown]\n    (@dropDown.done)=\"onPanelAnimationDone($event)\"\n  >\n    <ng-content ></ng-content>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;justify-content:flex-start;flex-direction:column;border:var(--color-text, #ccc) solid 2px;padding:5px 10px;box-sizing:border-box;border-radius:var(--border-radius, 10px);min-width:250px}:host:hover{cursor:pointer;background-color:var(--color-background, #eceff1)}:host:hover .selected-value{transform:scale(.9)}:host.select-panel-open{position:relative;z-index:1001}:host.disabled{opacity:.5;pointer-events:none;-webkit-user-select:none;user-select:none}.label{font-size:13px;font-weight:800;color:var(--color-text)}.control{width:100%;display:flex;justify-content:space-between;align-items:center}.selected-value{font-size:16px;margin-right:15px;transition:transform .2s;transform-origin:left;width:100%}.selected-value.empty{opacity:.6}.select-search{border:none;padding:0;background:transparent;outline:none}.panel{min-width:250px;padding:5px 10px;box-sizing:border-box;border-radius:var(--border-radius, 10px);border:var(--color-text, #ccc) solid 2px;background-color:#fff;transform-origin:top;min-height:45px;max-height:180px;overflow:auto}.clear-button{font-size:10px;background-color:transparent;padding:1px 3px;border:none;width:40px;margin:0 3px;font-weight:300;opacity:.7}.clear-button:hover{background-color:var(--color-backgroud-darker, #cfd8dc);opacity:1}\n"] }]
        }], ctorParameters: () => [], propDecorators: { label: [{
                type: Input
            }], value: [{
                type: Input
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], open: [{
                type: HostListener,
                args: ['click']
            }], options: [{
                type: ContentChildren,
                args: [OptionComponent, { descendants: true }]
            }] } });

class SelectModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, declarations: [SelectComponent, OptionComponent], imports: [CommonModule, OverlayModule], exports: [SelectComponent, OptionComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, imports: [CommonModule, OverlayModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: SelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectComponent, OptionComponent],
                    imports: [CommonModule, OverlayModule],
                    exports: [SelectComponent, OptionComponent],
                }]
        }] });

class KeysPipe {
    transform(value, ...args) {
        return Object.keys(value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: KeysPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: KeysPipe, name: "keys" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: KeysPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'keys',
                }]
        }] });

class NgOtpInputModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, declarations: [OtpInputComponent, KeysPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownComponent, NumberOnlyDirective], exports: [OtpInputComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, providers: [KeysPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownComponent] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NgOtpInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownComponent, NumberOnlyDirective],
                    declarations: [OtpInputComponent, KeysPipe,],
                    exports: [OtpInputComponent],
                    providers: [KeysPipe],
                }]
        }] });

class OtpInputComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OtpInputComponent, deps: [{ token: KeysPipe }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0", type: OtpInputComponent, selector: "app-otp-input", inputs: { config: "config" }, outputs: { onInputChange: "onInputChange", onCountDown: "onCountDown" }, ngImport: i0, template: "<div class=\"flex items-center justify-center gap-36\">\n  <div\n    class=\"wrapper {{ config.containerClass }} \"\n    id=\"c_{{ componentKey }}\"\n    *ngIf=\"otpForm?.controls\"\n    [ngStyle]=\"config.containerStyles\"\n  >\n    <input\n      [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\"\n      [type]=\"inputType\"\n      numberOnly\n      [placeholder]=\"config.placeholder || ''\"\n      [ngStyle]=\"config.inputStyles\"\n      maxlength=\"1\"\n      class=\"otp-input {{ config.inputClass }}\"\n      autocomplete=\"off\"\n      *ngFor=\"let item of otpForm?.controls | keys; let i = index\"\n      [formControl]=\"otpForm.controls[item]\"\n      id=\"otp_{{ i }}_{{ componentKey }}\"\n      (keydown)=\"onKeyDown($event)\"\n      (keyup)=\"onKeyUp($event, i)\"\n    />\n  </div>\n</div>\n\n<div class=\"text-center text-sm text-gray-600 mt-9\">\n  <countdown [config]=\"{ leftTime: 5 }\" (event)=\"onCount($event)\"></countdown>\n</div>\n@if (isTimeDone) {\n<a\n  (click)=\"resendCode($event)\"\n  class=\"font-medium text-indigo-600 hover:text-indigo-500\"\n>\n  Recend Code ...\n</a>\n}\n", styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4.CountdownComponent, selector: "countdown", inputs: ["config", "render"], outputs: ["event"] }, { kind: "pipe", type: KeysPipe, name: "keys" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: OtpInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-otp-input', template: "<div class=\"flex items-center justify-center gap-36\">\n  <div\n    class=\"wrapper {{ config.containerClass }} \"\n    id=\"c_{{ componentKey }}\"\n    *ngIf=\"otpForm?.controls\"\n    [ngStyle]=\"config.containerStyles\"\n  >\n    <input\n      [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\"\n      [type]=\"inputType\"\n      numberOnly\n      [placeholder]=\"config.placeholder || ''\"\n      [ngStyle]=\"config.inputStyles\"\n      maxlength=\"1\"\n      class=\"otp-input {{ config.inputClass }}\"\n      autocomplete=\"off\"\n      *ngFor=\"let item of otpForm?.controls | keys; let i = index\"\n      [formControl]=\"otpForm.controls[item]\"\n      id=\"otp_{{ i }}_{{ componentKey }}\"\n      (keydown)=\"onKeyDown($event)\"\n      (keyup)=\"onKeyUp($event, i)\"\n    />\n  </div>\n</div>\n\n<div class=\"text-center text-sm text-gray-600 mt-9\">\n  <countdown [config]=\"{ leftTime: 5 }\" (event)=\"onCount($event)\"></countdown>\n</div>\n@if (isTimeDone) {\n<a\n  (click)=\"resendCode($event)\"\n  class=\"font-medium text-indigo-600 hover:text-indigo-500\"\n>\n  Recend Code ...\n</a>\n}\n", styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}\n"] }]
        }], ctorParameters: () => [{ type: KeysPipe }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }], propDecorators: { config: [{
                type: Input
            }], onInputChange: [{
                type: Output
            }], onCountDown: [{
                type: Output
            }] } });

class NumberOnlyDirective {
    constructor(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
    }
    ngOnInit() {
        if (!this.disabledNumberOnly) {
            this._renderer.setAttribute(this._elRef.nativeElement, "onkeypress", "return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0");
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NumberOnlyDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: NumberOnlyDirective, isStandalone: true, selector: "[appNumberOnly]", inputs: { disabledNumberOnly: "disabledNumberOnly" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: NumberOnlyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[appNumberOnly]",
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { disabledNumberOnly: [{
                type: Input
            }] } });

/*
 * Public API Surface of ali
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AliComponent, AliService, NgOtpInputModule, NumberOnlyDirective, OptionComponent, OtpInputComponent, RatingPickerComponent, SelectComponent, SelectModule };
//# sourceMappingURL=ali-lib.mjs.map
