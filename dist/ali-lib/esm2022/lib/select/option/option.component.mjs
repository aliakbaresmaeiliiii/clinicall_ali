import { Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import * as i0 from "@angular/core";
export class OptionComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NsaWVudC9hbGktbGliL3NyYy9saWIvc2VsZWN0L29wdGlvbi9vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vY2xpZW50L2FsaS1saWIvc3JjL2xpYi9zZWxlY3Qvb3B0aW9uL29wdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7O0FBUXZCLE1BQU0sT0FBTyxlQUFlO0lBTjVCO1FBUUUsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFFNUIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFJbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFXckMsZUFBVSxHQUFHLEtBQUssQ0FBQztLQVU5QjtJQWxCVyxNQUFNO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUtELFFBQVEsS0FBVSxDQUFDO0lBRW5CLG1CQUFtQjtRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7OEdBL0JVLGVBQWU7a0dBQWYsZUFBZSw2U0NoQjVCLDRKQUtDOzsyRkRXWSxlQUFlO2tCQU4zQixTQUFTOytCQUNFLFlBQVksY0FDVixLQUFLOzhCQU1qQixLQUFLO3NCQURKLEtBQUs7Z0JBR04sYUFBYTtzQkFEWixLQUFLO2dCQUtOLFFBQVE7c0JBRlAsS0FBSzs7c0JBQ0wsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBSTdCLFFBQVE7c0JBRFAsTUFBTTtnQkFJRyxNQUFNO3NCQURmLFlBQVk7dUJBQUMsT0FBTztnQkFTWCxVQUFVO3NCQURuQixXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItb3B0aW9uJyxcbiAgc3RhbmRhbG9uZTogZmFsc2UsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcHRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vb3B0aW9uLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKVxuICBkaXNhYmxlUmVhc29uID0gJyc7XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxPcHRpb25Db21wb25lbnQ+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBwcm90ZWN0ZWQgc2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5oaWdobGlnaHRBc1NlbGVjdGVkKCk7XG4gICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpXG4gIHByb3RlY3RlZCBpc1NlbGVjdGVkID0gZmFsc2U7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGhpZ2hsaWdodEFzU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgfVxuICBkZXNlbGVjdCgpIHtcbiAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm9wdGlvbi1jb250ZW50XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5AaWYgKGRpc2FibGVSZWFzb24pIHtcbiAgICA8ZGl2IGNsYXNzPVwiZGlzYWJsZS1yZWFzb25cIj57e2Rpc2FibGVSZWFzb259fTwvZGl2PlxufSJdfQ==