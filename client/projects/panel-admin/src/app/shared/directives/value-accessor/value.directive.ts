import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector:
    '[formControlName][contenteditable],[formControl][contenteditable],[ngModel][contenteditable]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableContentValueAccessor,
      multi: true,
    },
  ],
})
export class EditableContentValueAccessor {
  onChange!: (newValue: string) => void;
  onTouch!: () => void;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    this.onChange((e.target as HTMLElement).innerHTML);
  }

  @HostListener('blur')
  obBlue() {
    this.onTouch();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'contentEditable',
      !isDisabled
    );
  }
}
