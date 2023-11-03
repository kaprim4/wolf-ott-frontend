import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { ApexChartOptions } from './apex-chart.model';

@Component({
  selector: 'app-chart-apexchart',
  templateUrl: './apex.component.html',
  styleUrls: ['./apex.component.scss']
})
export class ApexComponent implements OnInit {

  lineChartOptions1: Partial<ApexChartOptions> = {};
  lineChartOptions2: Partial<ApexChartOptions> = {};
  barChartOptions1: Partial<ApexChartOptions> = {};
  barChartOptions2: Partial<ApexChartOptions> = {};
  pieChartOption1: Partial<ApexChartOptions> = {};
  donutChartOptions1: Partial<ApexChartOptions> = {};
  areaChartOptions1: Partial<ApexChartOptions> = {};
  areaChartOptions2: Partial<ApexChartOptions> = {};
  mixedChartOptions: Partial<ApexChartOptions> = {};

  constructor (private eventService: EventService) { }

  ngOnInit(): void {

    (window as any)['Apex'] = {
      chart: {
        parentHeightOffset: 0,
        toolbar: {
          show: false
        }
      }
    };

    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Apexcharts",
      breadCrumbItems: [{ label: 'Charts', path: '.' }, { label: 'Apexchart', path: '.', active: true }]
    });
    this.initLineChart();
    this.initBarChart();
    this.initPieCharts();
    this.initAreaCharts();
    this.initMixedChart();
  }

  /**
  * initialize line chart config
  */
  initLineChart(): void {
    this.lineChartOptions1 = {
      series: [
        {
          name: 'High - 2018',
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: 'Low - 2018',
          data: [12, 11, 14, 18, 17, 13, 13],
        },
      ],
      chart: {
        height: 380,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#35b8e0', '#10c469'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: [3, 3],
        curve: 'smooth',
      },
      title: {
        text: 'Average High & Low Temperature',
        align: 'left',
        style: {
          fontSize: '14px',
        },
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2,
        },
        borderColor: '#f7f7f7',
      },
      markers: {
        size: 6,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Temperature',
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              toolbar: {
                show: false,
              },
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    };

    this.lineChartOptions2 = {
      series: [
        {
          name: 'Prices',
          data: [
            8107.85, 8128, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95,
            8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9340.85,
          ],
        },
      ],
      annotations: {
        yaxis: [
          {
            y: 8200,
            borderColor: '#10c469',
            label: {
              borderColor: '#10c469',
              style: {
                color: '#fff',
                background: '#10c469',
              },
              text: 'Support',
            },
          },
        ],
        xaxis: [
          {
            x: new Date('23 Nov 2017').getTime(),
            borderColor: '#5b69bc',
            label: {
              borderColor: '#5b69bc',
              style: {
                color: '#fff',
                background: '#5b69bc',
              },
              text: 'Anno Test',
            },
          },
          {
            x: new Date('03 Dec 2017').getTime(),
            borderColor: '#f9c851',
            label: {
              borderColor: '#f9c851',
              style: {
                color: '#fff',
                background: '#f9c851',
              },
              orientation: 'horizontal',
              text: 'New Beginning',
            },
          },
        ],
        points: [
          {
            x: new Date('27 Nov 2017').getTime(),
            y: 8506.9,
            marker: {
              size: 8,
              fillColor: '#fff',
              strokeColor: '#ff5b5b',
              radius: 2,
            },
            label: {
              borderColor: '#ff5b5b',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#ff5b5b',
              },

              text: 'Point Annotation',
            },
          },
        ],
      },
      chart: {
        height: 380,
        type: 'line',
        id: 'areachart-2',
      },
      labels: [
        '13 Nov 2017',
        '14 Nov 2017',
        '15 Nov 2017',
        '16 Nov 2017',
        '17 Nov 2017',
        '20 Nov 2017',
        '21 Nov 2017',
        '22 Nov 2017',
        '23 Nov 2017',
        '24 Nov 2017',
        '27 Nov 2017',
        '28 Nov 2017',
        '29 Nov 2017',
        '30 Nov 2017',
        '01 Dec 2017',
        '04 Dec 2017',
        '05 Dec 2017',
        '06 Dec 2017',
        '07 Dec 2017',
        '08 Dec 2017',
      ],
      colors: ['#39afd1'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3],
        curve: 'straight',
      },
      title: {
        text: 'Line with Annotations',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2,
        },
        borderColor: '#f7f7f7',
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              toolbar: {
                show: false,
              },
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    };


  }

  /**
   * initialize bar chart config
   */
  initBarChart(): void {
    this.barChartOptions1 = {
      series: [
        {
          name: 'Series 1',
          data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
          name: 'Series 2',
          data: [53, 32, 33, 52, 13, 44, 32],
        },
      ],
      chart: {
        height: 380,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      colors: ['#ff5b5b', '#98a6ad'],
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },

      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
      legend: {
        offsetY: -10,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      grid: {
        borderColor: '#f7f7f7',
      },
    };

    this.barChartOptions2 = {
      series: [
        {
          name: 'Marine Sprite',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Striking Calf',
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: 'Tank Picture',
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'Bucket Slope',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: 'Reborn Kid',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
      ],
      chart: {
        height: 380,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: (val: string) => {
            return val + 'K';
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      colors: ['#35b8e0', '#98a6ad', '#10c469', '#ff5b5b', '#f9c851'],
      tooltip: {
        y: {
          formatter: (val: number) => {
            return val + 'K';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      grid: {
        borderColor: '#f7f7f7',
      },
    };
  }

  /**
   * initialize pie chart config
   */
  initPieCharts(): void {
    this.pieChartOption1 = {
      chart: {
        height: 320,
        type: 'pie',
        toolbar: {
          show: false
        }
      },
      series: [44, 55, 41, 17, 15],
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      colors: ['#727cf5', '#6c757d', '#0acf97', '#fa5c7c', '#e3eaef'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 240
          },
          legend: {
            show: false
          },
        }
      }]
    }

    this.donutChartOptions1 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 320,
        type: "donut",
        toolbar: {
          show: false
        }
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      colors: ['#39afd1', '#ffbc00', '#313a46', '#fa5c7c', '#0acf97'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  /**
   * initialize area chart config
   */
  initAreaCharts(): void {
    this.areaChartOptions1 = {
      series: [
        {
          name: 'Series 1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Series 2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 380,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      colors: ['#35b8e0', '#98a6ad'],
      legend: {
        offsetY: -10,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      tooltip: {
        fixed: {
          enabled: false,
          position: 'topRight',
        },
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2,
        },
        borderColor: '#f7f7f7',
      },
    };

    this.areaChartOptions2 = {
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'North',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 20,
          }),
        },
        {
          name: 'Central',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
            min: 10,
            max: 15,
          }),
        },
      ],
      chart: {
        height: 380,
        type: 'area',
        stacked: true,
        events: {
          selection: (chart, e) => {
            new Date(e.xaxis.min);
          },
        },
      },
      colors: ['#35b8e0', '#10c469', '#98a6ad'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      fill: {
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2,
        },
        borderColor: '#f7f7f7',
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              toolbar: {
                show: false,
              },
            },
          },
        },
      ],
    };


  }

  /**
   *  initialize mixed chart config
   */
  initMixedChart(): void {
    this.mixedChartOptions = {
      series: [
        {
          name: "TEAM A",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "TEAM B",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: "TEAM C",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        }
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },
      colors: ['#727cf5', '#39afd1', '#fa5c7c'],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
        "11/01/2003"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Points"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: number) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    };
  }

  /*
 * generate day wise time series
 */
  generateDayWiseTimeSeries(baseval: number, count: number, yrange: { min: number; max: number }): { x: number, y: number }[] {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({ x, y });
      baseval += 86400000;
      i++;
    }
    return series;
  };



}
