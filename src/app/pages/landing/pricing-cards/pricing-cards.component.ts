import { Component, Input, OnInit } from '@angular/core';
import { PricingPlan } from 'src/app/shared/widget/pricing-cards/pricing-card.model';

@Component({
  selector: 'app-landing-pricing-cards',
  templateUrl: './pricing-cards.component.html',
  styleUrls: ['./pricing-cards.component.scss']
})
export class PricingCardsComponent implements OnInit {

  @Input() pricingPlans: PricingPlan[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
