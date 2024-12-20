import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LineChartComponent } from '../../shared/components/charts/line-chart/line-chart.component';
import { StackedChartComponent } from '../../shared/components/charts/stacked-chart/stacked-chart.component';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        LineChartComponent,
        StackedChartComponent,
        PatientsModule,
        DoctorsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
chartTitle: string = 'Dynamic Chart Title';


  #route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  constructor() {
    
  }

  ngOnInit() {
    this.#route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
    });
  }


  handleTabChange(index: number) {}

  onRemove(e: any) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
