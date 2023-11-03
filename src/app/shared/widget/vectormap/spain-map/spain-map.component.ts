import { Component, Input, OnInit } from '@angular/core';
import 'jsvectormap';
import 'jsvectormap/dist/maps/spain.js';

@Component({
  selector: 'app-widget-spain-map',
  templateUrl: './spain-map.component.html',
  styleUrls: ['./spain-map.component.scss']
})
export class SpainMapComponent implements OnInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() options: any = {};
  @Input() mapId: string = "spainmap";

  constructor () { }

  ngOnInit(): void {
  }

}
