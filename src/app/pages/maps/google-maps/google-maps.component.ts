import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { MapConfig } from './google-map.model';

// data
import { DARKSTYLES, LIGHTSTYLES } from './data';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  gmapConfig1!: MapConfig;
  gmapConfig2!: MapConfig;
  gmapConfig3!: MapConfig;
  gmapConfig4!: MapConfig;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Google Maps",
      breadCrumbItems: [{ label: 'Maps', path: '.' }, { label: 'Google Maps', path: '.', active: true }]
    });

    this.initMapConfig();
  }

  /**
   * initialize map configuration
   */
  initMapConfig(): void {
    this.gmapConfig1 = {
      lat: 51.678418,
      lng: 7.809007
    }

    this.gmapConfig2 = {
      lat: 51.678418,
      lng: 7.809007,
      markers: [
        {
          lat: 51.668418,
          lng: 7.809007,
          title: 'Lima'
        },
        {
          lat: 51.568418,
          lng: 7.829007,
          title: 'Marker with InfoWindow'
        }
      ]
    }

    this.gmapConfig3 = {
      lat: 51.678418,
      lng: 7.809007,
      styles: LIGHTSTYLES
    }

    this.gmapConfig4 = {
      lat: 51.678418,
      lng: 7.809007,
      styles: DARKSTYLES
    }

  }

  /**
   * executes after map is loaded
   * @param map Gmap
   */
  mapReady(map: any): void {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });
  }


}
