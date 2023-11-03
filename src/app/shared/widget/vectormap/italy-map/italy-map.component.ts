import { Component, Input, OnInit } from '@angular/core';
import 'jsvectormap';
import 'jsvectormap/dist/maps/italy.js';

@Component({
  selector: 'app-widget-italy-map',
  templateUrl: './italy-map.component.html',
  styleUrls: ['./italy-map.component.scss']
})
export class ItalyMapComponent implements OnInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() options: any = {};
  @Input() mapId: string = "italymap";

  constructor () { }

  ngOnInit(): void {
  }

}
