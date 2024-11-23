import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
  viewChild
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
import { OperationsComponent } from "../operations/operations.component";
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
        OperationsComponent,
        DoctorsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
chartTitle: string = 'Dynamic Chart Title';

  readonly templateOne = viewChild.required<TemplateRef<any>>('templateOne');
  readonly templateTwo = viewChild.required<TemplateRef<any>>('templateTwo');
  readonly templateThree = viewChild.required<TemplateRef<any>>('templateThree');
  readonly templatefour = viewChild.required<TemplateRef<any>>('templatefour');

  tabs: {
    id: number;
    title: string;
    template: TemplateRef<any>;
    context?: any;
  }[] = [];

  #route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  constructor() {
    
  }

  ngOnInit() {
    this.#route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
    });
    this.setDataInTabs();
  }

  setDataInTabs() {
    this.tabs = [
      {
        id: 0,
        title: 'Tab 1',
        template: this.templateOne(),
        context: { data: 'Data for Tab 1' },
      },
      {
        id: 1,
        title: 'Tab 2',
        template: this.templateTwo(),
        context: { data: 'Data for Tab 2' },
      },
      {
        id: 3,
        title: 'Tab 3',
        template: this.templateThree(),
        context: { data: 'Data for Tab 3' },
      },
      {
        id: 4,
        title: 'Tab 4',
        template: this.templatefour(),
        context: { data: 'Data for Tab 4' },
      },
    ];
  }

  handleTabChange(index: number) {}

  onRemove(e: any) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
