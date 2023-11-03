import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { FAQItem } from 'src/app/shared/widget/faq/faq.model';

// data
import { FAQS1, FAQS2 } from './data';

@Component({
  selector: 'app-pages-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  faqs1: FAQItem[] = [];
  faqs2: FAQItem[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "FAQs",
      breadCrumbItems: [{ label: 'Extra Pages', path: '.' }, { label: 'FAQs', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.faqs1 = FAQS1;
    this.faqs2 = FAQS2;
  }


}
