import { ElementRef, Renderer2 } from "@angular/core";
import * as i0 from "@angular/core";
export declare class NumberOnlyDirective {
    private _elRef;
    private _renderer;
    disabledNumberOnly: boolean;
    constructor(_elRef: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberOnlyDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NumberOnlyDirective, "[appNumberOnly]", never, { "disabledNumberOnly": { "alias": "disabledNumberOnly"; "required": false; }; }, {}, never, never, true, never>;
}
