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
  timeSlots: string[] = [];
  defaultTime: string = '';
  ngOnInit(): void {
    this.generateTimeSlots();
  }
  generateTimeSlots(): void {
    const interval = 15; // Interval in minutes
    const startTime = 0; // Start of the day in minutes (00:00)
    const endTime = 24 * 60; // End of the day in minutes (24:00)
    for (let minutes = startTime; minutes < endTime; minutes += interval) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const time = this.formatTime(hours, mins);
      this.timeSlots.push(time);
      this.defaultTime = time;
    }
  }

  formatTime(hours: number, minutes: number): string {
    const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
}
