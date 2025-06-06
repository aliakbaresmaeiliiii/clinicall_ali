import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input
} from '@angular/core';
import { ClipboardService } from './clipboard.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[dfCanCopyToClipboard]',
  standalone: true,
  exportAs: 'dfClipboard',
})
export class CanCopyToClipboardDirective {
  #clipboard = inject(ClipboardService);
  #el: ElementRef = inject(ElementRef);

  #copied = new BehaviorSubject<boolean>(false);
  copied$ = this.#copied.asObservable();

  readonly text = input('');

  // get #computedSelectionText() {
  //   // const currentSelection = window?.getSelection()?.toString();
  //   // const innerElText = this.#el.nativeElement.innerElText;
  //   // return this.text || currentSelection || innerElText;
  // }

  // @HostListener('click', ['$event'])
  // copy(e?: Event) {
  //   e?.preventDefault();
  //   this.#el.nativeElement.select?.();
  //   this.#clipboard
  //     .copy(this.#computedSelectionText)
  //     .then(() => this.#copied.next(false));
  // }

  clear() {
    this.#clipboard.clear().then(() => this.#copied.next(false));
  }
}
