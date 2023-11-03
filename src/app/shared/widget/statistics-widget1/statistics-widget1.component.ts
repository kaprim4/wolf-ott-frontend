import { Component, Input, OnInit } from '@angular/core';
// types
import { ApexChartOptions } from 'src/app/pages/charts/apex/apex-chart.model';

@Component({
  selector: 'app-statistics-widget1',
  templateUrl: './statistics-widget1.component.html',
  styleUrls: ['./statistics-widget1.component.scss']
})
export class StatisticsWidget1Component implements OnInit {

  @Input() title: string = '';
  @Input() stats: number = 0;
  @Input() subTitle: string = '';
  @Input() color: string = '#ffbd4a';
  @Input() progress: number = 0;

  chartOptions: Partial<ApexChartOptions> = {};

  constructor () { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'radialBar',
        width: 77,
        height: 77,
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '75%',
          },
          track: {
            show: true,
            background: '#000',
            opacity: 0.3,
            margin: 0,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true,
              color: this.color,
              fontWeight: 700,
              fontSize: '14px',
              offsetY: 5,
              formatter: (val: number) => {
                return String(val);
              },
            },
          },
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      colors: [this.color],
      series: [this.progress]
    }
  }

}
