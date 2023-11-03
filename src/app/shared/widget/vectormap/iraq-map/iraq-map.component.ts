import { Component, Input, OnInit } from '@angular/core';
import 'jsvectormap';
import 'jsvectormap/dist/maps/iraq.js';

@Component({
  selector: 'app-widget-iraq-map',
  templateUrl: './iraq-map.component.html',
  styleUrls: ['./iraq-map.component.scss']
})
export class IraqMapComponent implements OnInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() options: any = {};
  @Input() mapId: string = "iraqmap";

  constructor () { }

  ngOnInit(): void {
  }

}
