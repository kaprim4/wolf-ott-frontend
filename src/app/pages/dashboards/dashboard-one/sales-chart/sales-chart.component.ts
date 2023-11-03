import { Component, OnInit } from '@angular/core';
// types
import { ApexChartOptions } from 'src/app/pages/charts/apex/apex-chart.model';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnInit {

  chartOptions: Partial<ApexChartOptions> = {};

  constructor () { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [30, 12, 20],
      chart: {
        type: 'donut',
        height: 315,
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                formatter: (val: string) => {
                  return val;
                },
                offsetY: 4,
                color: '#98a6ad',
              },
              value: {
                show: true,
                formatter: (val: string) => {
                  return val;
                },
                color: '#98a6ad',
              }
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#6658dd', '#ff8acc', '#35b8e0'],
      legend: {
        show: true,
        position: 'bottom',
        height: 40,
        labels: {
          useSeriesColors: true,
        },
      },
      labels: ['In-Store Sales', 'Download Sales', 'Mail-Order Sales'],
      tooltip: {
        enabled: false,
      },
    }
  }

}
