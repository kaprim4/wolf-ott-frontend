import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-vector-maps',
  templateUrl: './vector-maps.component.html',
  styleUrls: ['./vector-maps.component.scss']
})
export class VectorMapsComponent implements OnInit {

  worldMapConfig: any = {};
  canadaMapConfig: any = {};
  russiaMapConfig: any = {};
  usaMapConfig: any = {};
  spainMapConfig: any = {};
  italyMapConfig: any = {};
  iraqMapConfig: any = {};

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Vector Maps",
      breadCrumbItems: [{ label: 'Maps', path: '.' }, { label: 'Vector Maps', path: '.', active: true }]
    });
    this.initMapConfig();
  }

  /**
   * initialize map configurations
   */
  initMapConfig(): void {
    this.worldMapConfig = {
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#e3eaef',
        },
      },
      markers: [
        { coords: [41.9, 12.45], name: 'Vatican City' },
        { coords: [43.73, 7.41], name: 'Monaco' },
        { coords: [-0.52, 166.93], name: 'Nauru' },
        { coords: [-8.51, 179.21], name: 'Tuvalu' },
        { coords: [43.93, 12.46], name: 'San Marino' },
        { coords: [47.14, 9.52], name: 'Liechtenstein' },
        { coords: [7.11, 171.06], name: 'Marshall Islands' },
        { coords: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
        { coords: [3.2, 73.22], name: 'Maldives' },
        { coords: [35.88, 14.5], name: 'Malta' },
        { coords: [12.05, -61.75], name: 'Grenada' },
        { coords: [13.16, -61.23], name: 'Saint Vincent and the Grenadines' },
        { coords: [13.16, -59.55], name: 'Barbados' },
        { coords: [17.11, -61.85], name: 'Antigua and Barbuda' },
        { coords: [-4.61, 55.45], name: 'Seychelles' },
        { coords: [7.35, 134.46], name: 'Palau' },
        { coords: [42.5, 1.51], name: 'Andorra' },
        { coords: [14.01, -60.98], name: 'Saint Lucia' },
        { coords: [6.91, 158.18], name: 'Federated States of Micronesia' },
        { coords: [1.3, 103.8], name: 'Singapore' },
        { coords: [0.33, 6.73], name: 'SÃ£o TomÃ© and PrÃncipe' },
      ],
      markerStyle: {
        initial: {
          r: 9,
          fill: '#727cf5',
          'fill-opacity': 0.9,
          stroke: '#fff',
          'stroke-width': 7,
          'stroke-opacity': 0.4,
        },
        hover: {
          fill: '#727cf5',
          stroke: '#fff',
          'fill-opacity': 1,
          'stroke-width': 1.5,
        },
      },
    }

    this.canadaMapConfig = {
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#0acf97',
        },
      },
    };

    this.russiaMapConfig = {
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: '#727cf5',
        },
      },
    };

    this.usaMapConfig = {
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#39afd1',
        },
      },
    };

    this.spainMapConfig = {
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#6c757d',
        },
      },
    };

    this.italyMapConfig = {
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#fa5c7c',
        },
      },
    }

    this.iraqMapConfig = {
      zoomOnScroll: false,
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          fill: '#ffbc00',
        },
      },
    }
  }

}
