import { Component, Input, OnInit } from '@angular/core';

// types
import { Variant } from 'src/app/pages/ui/base-ui/shared/base-ui.model';

@Component({
  selector: 'app-statistics-widget2',
  templateUrl: './statistics-widget2.component.html',
  styleUrls: ['./statistics-widget2.component.scss']
})
export class StatisticsWidget2Component implements OnInit {

  @Input() title: string = '';
  @Input() stats: number = 0;
  @Input() subTitle: string = '';
  @Input() trendStats: number = 0;
  @Input() trendIcon: string = '';
  @Input() variant: Variant = 'dark';
  @Input() progress: number = 0;


  constructor () { }

  ngOnInit(): void {
  }

}
