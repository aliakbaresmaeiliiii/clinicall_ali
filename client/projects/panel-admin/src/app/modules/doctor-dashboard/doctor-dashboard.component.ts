import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LineChartComponent } from '../../shared/components/charts/line-chart/line-chart.component';
import { PieDountChartComponent } from '../../shared/components/charts/pie-dount-chart/pie-dount-chart.component';
import { PatientsGroupComponent } from '../patients-group/patients-group.component';
import { PatientsModule } from '../patients/patients.module';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { DoctorsModule } from '../doctors/doctors.module';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    LineChartComponent,
    PieDountChartComponent,
    PatientsModule,
    PatientsGroupComponent,
    TodoListComponent,
    DoctorsModule
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss',
})
export class DoctorDashboardComponent {}
