import { Directive, ElementRef, HostListener, input } from "@angular/core";

@Directive({
  selector: "[appNumberOnly]",
  standalone: false,
})
export class NumberOnlyDirective {
  readonly disabledNumberOnly = input.required<boolean>();

  constructor(private _elRef: ElementRef) {}

  @HostListener("keydown", ["$event"])
  onKeyPress(event: KeyboardEvent) {
    if (this.disabledNumberOnly()) {
      return;
    }
    const charCode = event.charCode;
    const isNumber = charCode >= 48 && charCode <= 57; // ASCII codes for numbers 0-9
    if (!isNumber && charCode !== 0) {
      event.preventDefault();
    }
  }
}
