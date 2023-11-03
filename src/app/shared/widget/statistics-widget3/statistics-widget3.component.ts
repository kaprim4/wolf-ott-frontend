import { Component, Input, OnInit } from '@angular/core';

// types
import { Variant } from 'src/app/pages/ui/base-ui/shared/base-ui.model';

@Component({
  selector: 'app-statistics-widget3',
  templateUrl: './statistics-widget3.component.html',
  styleUrls: ['./statistics-widget3.component.scss']
})
export class StatisticsWidget3Component implements OnInit {

  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() startVal: number = 0;
  @Input() variant: Variant = 'dark';


  constructor () { }

  ngOnInit(): void {
  }

}
