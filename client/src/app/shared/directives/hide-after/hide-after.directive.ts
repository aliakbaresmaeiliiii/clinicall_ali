import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  input
} from '@angular/core';

class HideAfterContext {
  public get $implicit() {
    return this.hideAfter;
  }
  public hideAfter = 0;
  public counter = 0;
  public hideAfterThen = null;
}

@Directive({
  selector: '[hideAfter]',
  standalone: true,
})
export class HideAfterDirective implements OnInit {
  @Input('hideAfter')
  set delay(value: number | null) {
    this._delay = value ?? 0;
    this.context.hideAfter = this.context.counter = this._delay / 1000;
  }
  private _delay = 0;

  readonly placeholder = input<TemplateRef<HideAfterContext> | null>(null, { alias: "hideAfterThen" });

  private context = new HideAfterContext();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<HideAfterContext>,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template, this.context);
    const intervalId = setInterval(() => {
      this.context.counter--;
      this.cd.markForCheck();
    }, 1000);
    setTimeout(() => {
      this.viewContainerRef.clear();
      const placeholder = this.placeholder();
      if (placeholder) {
        this.viewContainerRef.createEmbeddedView(
          placeholder,
          this.context
        );
      }
    }, this._delay);
  }
}
