import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  imports: [CommonModule],
  templateUrl: './menu-icon.component.html',
  styleUrl: './menu-icon.component.scss',
})
export class MenuIconComponent {
  icon = input<any>('dashboard-icon');
}
