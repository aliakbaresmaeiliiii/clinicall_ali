import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class OptionComponent implements OnInit {
    value: string | null;
    disableReason: string;
    disabled: boolean;
    selected: EventEmitter<OptionComponent>;
    protected select(): void;
    protected isSelected: boolean;
    ngOnInit(): void;
    highlightAsSelected(): void;
    deselect(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionComponent, "lib-option", never, { "value": { "alias": "value"; "required": false; }; "disableReason": { "alias": "disableReason"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "selected": "selected"; }, never, ["*"], false, never>;
}
