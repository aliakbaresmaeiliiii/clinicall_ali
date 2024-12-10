import { Component, input } from '@angular/core';

@Component({
  selector: 'app-yours-doctor',
  standalone: false,
  templateUrl: './yours-doctor.component.html',
  styleUrl: './yours-doctor.component.scss',
})
export class YoursDoctorComponent {
  counter = input<number>();
}
