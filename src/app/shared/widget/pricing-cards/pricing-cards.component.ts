import { Component, Input, OnInit } from '@angular/core';

// types
import { PricingPlan } from './pricing-card.model';

@Component({
  selector: 'app-widget-pricing-cards',
  templateUrl: './pricing-cards.component.html',
  styleUrls: ['./pricing-cards.component.scss']
})
export class PricingCardsComponent implements OnInit {

  @Input() pricingPlans: PricingPlan[] = [];
  @Input() containerClass: string = '';

  constructor () { }

  ngOnInit(): void {
  }

}
