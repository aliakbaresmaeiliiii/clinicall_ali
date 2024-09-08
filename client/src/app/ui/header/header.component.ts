import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  openMenu() {
    this.trigger.openMenu();
  }

  closeMenu() {
    this.trigger.closeMenu();
  }
}
