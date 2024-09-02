import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  responsive: ApexResponsive[] | any;
  legend: ApexLegend | any;
  fill: ApexFill | any;
};

export type ChartOptionsPieDount = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any |any;
};
