import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { PricingPlan } from 'src/app/shared/widget/pricing-cards/pricing-card.model';

// data
import { PRICINGPLANS1, PRICINGPLANS2 } from './data';

@Component({
  selector: 'app-pages-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  pricingPlans1: PricingPlan[] = [];
  pricingPlans2: PricingPlan[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Pricing",
      breadCrumbItems: [{ label: 'Extra Pages', path: '.' }, { label: 'Pricing', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.pricingPlans1 = PRICINGPLANS1;
    this.pricingPlans2 = PRICINGPLANS2;
  }

}
