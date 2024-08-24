import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appGenericTab]',
  standalone: true,
})
export class GenericTabDirective {
  tpl = inject(TemplateRef);

  constructor() {}
}
