import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

// types
import { Variant } from '../shared/base-ui.model';

type CardGroupItem = {
  id?: number;
  image?: string;
  title?: string;
  text?: string;
  subtext?: string;
}


@Component({
  selector: 'app-ui-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  coloredCards: Variant[] = ['primary', 'success', 'info', 'warning', 'danger', 'purple', 'pink'];
  borderedCards: Variant[] = ['primary', 'secondary', 'success'];
  cardGroup: CardGroupItem[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Cards",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Cards', path: '.', active: true }]
    });
    this.cardGroup = [
      {
        id: 1,
        image: 'assets/images/gallery/8.jpg',
        title: 'Card title',
        text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        subtext: 'Last updated 3 mins ago'
      },
      {
        id: 2,
        image: 'assets/images/gallery/9.jpg',
        title: 'Card title',
        text: 'This card has supporting text below as a natural lead-in to additional content.',
        subtext: 'Last updated 3 mins ago'
      },
      {
        id: 3,
        image: 'assets/images/gallery/10.jpg',
        title: 'Card title',
        text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
        subtext: 'Last updated 3 mins ago'
      }
    ];
  }

}
