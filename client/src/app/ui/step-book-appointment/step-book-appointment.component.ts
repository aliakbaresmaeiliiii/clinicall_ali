import { Component, input } from '@angular/core';



@Component({
  selector: 'app-step-book-appointment',
  templateUrl: './step-book-appointment.component.html',
  styleUrl: './step-book-appointment.component.scss',
  standalone: false,
})
export class StepBookAppointmentComponent {
  title = input<string>('');
  subTitle = input<string>('');
  description = input<string>('');
}
