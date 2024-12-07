import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-time-selector',
  imports: [MatFormFieldModule, CommonModule, MatInputModule, MatSelectModule],
  standalone: true,
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss',
})
export class TimeSelectorComponent {
  
}
