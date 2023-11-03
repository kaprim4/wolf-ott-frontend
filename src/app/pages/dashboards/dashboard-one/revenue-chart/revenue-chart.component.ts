import { Component, OnInit } from '@angular/core';

// types
import { ApexChartOptions } from 'src/app/pages/charts/apex/apex-chart.model';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnInit {

  chartOptions: Partial<ApexChartOptions> = {};

  constructor () { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Series A',
          type: 'area',
          data: [50, 75, 30, 50, 75, 50, 75, 100],
        },
        {
          name: 'Series B',
          type: 'line',
          data: [0, 40, 80, 40, 10, 40, 50, 70],
        },
      ],
      chart: {
        height: 268,
        type: 'line',
        toolbar: {
          show: false,
        },
        stacked: false,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: [3, 3],
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      fill: {
        type: 'solid',
        opacity: [0, 1],
      },
      colors: ['#3cc469', '#188ae2'],
      xaxis: {
        categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#adb5bd',
          },
        },
      },
      yaxis: {
        tickAmount: 4,
        min: 0,
        max: 100,
        labels: {
          style: {
            colors: '#adb5bd',
          },
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          bottom: 0,
        },
      },
      tooltip: {
        theme: 'dark',
      },
    }
  }

}
