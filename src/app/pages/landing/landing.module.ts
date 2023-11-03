import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CountUpModule } from 'ngx-countup';
import { CtaComponent } from './cta/cta.component';
import { DemosComponent } from './demos/demos.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PricingCardsComponent } from './pricing-cards/pricing-cards.component';
import { ServicesComponent } from './services/services.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';



@NgModule({
  declarations: [
    LandingComponent,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    ServicesComponent,
    DemosComponent,
    TestimonialsComponent,
    StatisticsComponent,
    PricingCardsComponent,
    CtaComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CountUpModule,
    NgbCollapseModule,
    NgbNavModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
