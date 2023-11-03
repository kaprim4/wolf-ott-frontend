import { Component, OnInit } from '@angular/core';
import { SortableOptions } from 'sortablejs';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';


type MoveableCard = {
  id: string;
  image?: string;
  bgVariant?: string;
}

@Component({
  selector: 'app-ui-draggable-cards',
  templateUrl: './draggable-cards.component.html',
  styleUrls: ['./draggable-cards.component.scss']
})
export class DraggableCardsComponent implements OnInit {

  options1: SortableOptions = {};
  movableCardGroup1: MoveableCard[] = [];
  movableCardGroup2: MoveableCard[] = [];
  movableCardGroup3: MoveableCard[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Draggable Cards",
      breadCrumbItems: [{ label: 'Extended UI', path: '.' }, { label: 'Draggable Cards', path: '.', active: true }]
    });
    this.options1 = {
      group: 'container1',
      animation: 150,
    }
    this.movableCardGroup1 = [
      {
        id: 'card-1',
        image: 'assets/images/gallery/1.jpg'
      },
      {
        id: 'card-2',
        bgVariant: 'primary'
      },
      {
        id: 'card-3'
      }
    ];

    this.movableCardGroup2 = [
      {
        id: 'card-4'
      },
      {
        id: 'card-5',
        image: 'assets/images/gallery/3.jpg'
      },
      {
        id: 'card-6'
      }];

    this.movableCardGroup3 = [
      {
        id: 'card-7',
      },
      {
        id: 'card-8'
      },
      {
        id: 'card-9'
      },
      {
        id: 'card-10',
        bgVariant: 'danger'
      }]


  }

}
