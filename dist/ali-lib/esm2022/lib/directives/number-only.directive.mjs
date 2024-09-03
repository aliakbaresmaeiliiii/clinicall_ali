import { Directive, Input } from "@angular/core";
import * as i0 from "@angular/core";
export class NumberOnlyDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLW9ubHkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vY2xpZW50L2FsaS1saWIvc3JjL2xpYi9kaXJlY3RpdmVzL251bWJlci1vbmx5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQzs7QUFNeEUsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUFvQixNQUFrQixFQUFVLFNBQW9CO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUV4RSxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFDekIsWUFBWSxFQUNaLDhFQUE4RSxDQUMvRSxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7OEdBYlUsbUJBQW1CO2tHQUFuQixtQkFBbUI7OzJGQUFuQixtQkFBbUI7a0JBSi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsVUFBVSxFQUFFLElBQUk7aUJBQ2pCO3VHQUVVLGtCQUFrQjtzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogXCJbYXBwTnVtYmVyT25seV1cIixcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyT25seURpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGRpc2FibGVkTnVtYmVyT25seSE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkTnVtYmVyT25seSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKFxuICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICBcIm9ua2V5cHJlc3NcIixcbiAgICAgICAgXCJyZXR1cm4gKGV2ZW50LmNoYXJDb2RlID49IDQ4ICYmIGV2ZW50LmNoYXJDb2RlIDw9IDU3KSB8fCBldmVudC5jaGFyQ29kZSA9PSAwXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=