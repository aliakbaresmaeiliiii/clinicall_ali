import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'app-modules',
    template: ` 
    <router-outlet />
    `,
    styles: ``,
    standalone: false
})
export class ModulesComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
