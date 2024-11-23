import { Directive, ElementRef, Renderer2, input } from "@angular/core";

@Directive({
  selector: "[appNumberOnly]",
  standalone: true,
})
export class NumberOnlyDirective {
  readonly disabledNumberOnly = input.required<boolean>();

  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    if (!this.disabledNumberOnly()) {
      this._renderer.setAttribute(
        this._elRef.nativeElement,
        "onkeypress",
        "return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0"
      );
    }
  }
}
