import { Component, Input, OnInit } from '@angular/core';
import { Statistic } from '../landing.model';

@Component({
  selector: 'app-landing-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() statistics: Statistic[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
