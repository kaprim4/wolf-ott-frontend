import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

type RatioItem = {
  ratioX: number;
  ratioY: number;
}

@Component({
  selector: 'app-ui-embed-video',
  templateUrl: './embed-video.component.html',
  styleUrls: ['./embed-video.component.scss']
})
export class EmbedVideoComponent implements OnInit {

  embedVideoCards: RatioItem[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Video",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Video', path: '.', active: true }]
    });
    this.embedVideoCards = [
      {
        ratioX: 21,
        ratioY: 9
      },
      {
        ratioX: 16,
        ratioY: 9
      },
      {
        ratioX: 1,
        ratioY: 1
      },
      {
        ratioX: 4,
        ratioY: 3
      }
    ];
  }

}
