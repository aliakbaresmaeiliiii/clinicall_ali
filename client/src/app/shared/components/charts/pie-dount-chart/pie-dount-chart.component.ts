import { Component, viewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptionsPieDount } from '../../../models/chart-option';

@Component({
    selector: 'app-pie-dount-chart',
    imports: [NgApexchartsModule],
    templateUrl: './pie-dount-chart.component.html',
    styleUrl: './pie-dount-chart.component.scss'
})
export class PieDountChartComponent {
  readonly chart = viewChild.required<ChartComponent>('chart');
  public chartOptions: Partial<ChartOptionsPieDount>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
