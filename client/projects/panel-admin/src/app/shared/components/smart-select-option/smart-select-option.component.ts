import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SelectModule } from 'ali';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, SelectModule],
  templateUrl: './smart-select-option.component.html',
  styleUrl: './smart-select-option.component.scss',
})
export class SmartSelecOtionComponent{

}
