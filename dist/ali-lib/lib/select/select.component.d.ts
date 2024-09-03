import { AfterContentInit, EventEmitter, QueryList } from '@angular/core';
import { OptionComponent } from './option/option.component';
import * as i0 from "@angular/core";
export declare class SelectComponent implements AfterContentInit {
    label: string;
    set value(value: string | null);
    get value(): string | null;
    private selectionModel;
    readonly opened: EventEmitter<void>;
    readonly closed: EventEmitter<void>;
    open(): void;
    close(): void;
    options: QueryList<OptionComponent>;
    isOpen: boolean;
    constructor();
    ngAfterContentInit(): void;
    onPanelAnimationDone({ fromState, toState }: AnimationEvent | any): void;
    private highlightSelectedOptions;
    private findOptionsByValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectComponent, "lib-select", never, { "label": { "alias": "label"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "opened": "opened"; "closed": "closed"; }, ["options"], ["*"], false, never>;
}
