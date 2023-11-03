import { Component, Input, OnInit } from '@angular/core';
import 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

@Component({
  selector: 'app-widget-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() options: any = {};
  @Input() mapId: string = "worldmap";

  constructor () { }

  ngOnInit(): void {
  }

}
