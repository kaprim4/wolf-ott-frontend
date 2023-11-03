import { Component, OnInit } from '@angular/core';
import { PricingPlan } from 'src/app/shared/widget/pricing-cards/pricing-card.model';
import { LAYOUTS, PRICINGPLANS, SERVICES, STATISTICS, TESTIMONIALS } from './data';
import { Layout, Service, Statistic, Testimonial } from './landing.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  services: Service[] = [];
  demos: Layout[] = [];
  testimonials: Testimonial[] = [];
  statistics: Statistic[] = [];
  pricingPlans: PricingPlan[] = [];

  constructor () { }

  ngOnInit(): void {
    let mybutton = document.getElementById("back-to-top");
    window.addEventListener('scroll', () => {
      if (mybutton) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          mybutton.style.display = "block";
        } else {
          mybutton.style.display = "none";
        }
      }
    });

    this._fetchData();
  }

  ngAfterViewInit(): void {
    document.body.classList.add("bg-white", 'pb-0');
  }

  ngOnDestroy(): void {
    document.body.classList.remove("bg-white", 'pb-0');
  }


  /**
   * reach to top of web page
   */
  topFunction(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.services = SERVICES;
    this.demos = LAYOUTS;
    this.testimonials = TESTIMONIALS;
    this.statistics = STATISTICS;
    this.pricingPlans = PRICINGPLANS;
  }

}
