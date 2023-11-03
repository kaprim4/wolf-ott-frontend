import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { CanadaMapComponent } from './vectormap/canada-map/canada-map.component';
import { IraqMapComponent } from './vectormap/iraq-map/iraq-map.component';
import { ItalyMapComponent } from './vectormap/italy-map/italy-map.component';
import { RussiaMapComponent } from './vectormap/russia-map/russia-map.component';
import { SpainMapComponent } from './vectormap/spain-map/spain-map.component';
import { UsaMapComponent } from './vectormap/usa-map/usa-map.component';
import { VectormapComponent } from './vectormap/vectormap.component';
import { WorldMapComponent } from './vectormap/world-map/world-map.component';
import { StatisticsWidget1Component } from './statistics-widget1/statistics-widget1.component';
import { StatisticsWidget2Component } from './statistics-widget2/statistics-widget2.component';
import { StatisticsWidget3Component } from './statistics-widget3/statistics-widget3.component';
import { UserCardComponent } from './user-card/user-card.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { RemaindersComponent } from './remainders/remainders.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { NgbAccordionModule, NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PricingCardsComponent } from './pricing-cards/pricing-cards.component';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    VectormapComponent,
    CanadaMapComponent,
    WorldMapComponent,
    UsaMapComponent,
    IraqMapComponent,
    ItalyMapComponent,
    RussiaMapComponent,
    SpainMapComponent,
    StatisticsWidget1Component,
    StatisticsWidget2Component,
    StatisticsWidget3Component,
    UserCardComponent,
    TeamMembersComponent,
    RemaindersComponent,
    MemberCardComponent,
    PricingCardsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgApexchartsModule,
    NgbProgressbarModule,
    NgbDropdownModule,
    NgbAccordionModule,
    CountUpModule,
  ],
  exports: [
    VectormapComponent,
    CanadaMapComponent,
    WorldMapComponent,
    UsaMapComponent,
    IraqMapComponent,
    ItalyMapComponent,
    RussiaMapComponent,
    SpainMapComponent,
    StatisticsWidget1Component,
    StatisticsWidget2Component,
    StatisticsWidget3Component,
    UserCardComponent,
    TeamMembersComponent,
    RemaindersComponent,
    MemberCardComponent,
    PricingCardsComponent,
    FaqComponent
  ]
})
export class WidgetModule { }
