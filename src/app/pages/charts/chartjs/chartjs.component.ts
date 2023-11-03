import { Component, OnInit } from '@angular/core';

// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { ChartDataset } from './chartjs.model';

// data
import { BARCHART, DONUTCHART, LINECHART, PIECHART, POLARAREACHART, RADARCHART } from './data';

@Component({
  selector: 'app-charts-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit {

  //chart config
  lineChartOptions!: ChartDataset;
  barChartOptions!: ChartDataset;
  donutChartOptions!: ChartDataset;
  pieChartOptions!: ChartDataset;
  radarChartOptions!: ChartDataset;
  polarChartOptions!: ChartDataset;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Chartjs",
      breadCrumbItems: [{ label: 'Charts', path: '.' }, { label: 'Chartjs', path: '.', active: true }]
    });
    this.initCharts();
  }

  /**
 * initialize charts
 */
  initCharts(): void {
    this.lineChartOptions = LINECHART;
    this.barChartOptions = BARCHART;
    this.donutChartOptions = DONUTCHART;
    this.pieChartOptions = PIECHART;
    this.radarChartOptions = RADARCHART;
    this.polarChartOptions = POLARAREACHART;
  }


}
