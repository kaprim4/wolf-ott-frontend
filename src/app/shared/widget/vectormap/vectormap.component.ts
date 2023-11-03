import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

declare global {
  interface Window { jsVectorMap?: any; }
}

@Component({
  selector: 'app-widget-vectormap',
  templateUrl: './vectormap.component.html',
  styleUrls: ['./vectormap.component.scss']
})
export class VectormapComponent implements OnInit, AfterViewInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() options: any = {};
  @Input() type: string = "";
  @Input() mapId: string = "map";

  constructor () {
  }

  ngOnInit(): void {
  }

  /**
   * generates vecotor map
   */
  ngAfterViewInit(): void {
    const map: any = new window.jsVectorMap({
      selector: '#' + this.mapId,
      map: this.type,
      ...this.options
    })
  }

}
