import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAccordionModule,
  NgbAlertModule, NgbCarouselModule,
  NgbCollapseModule, NgbDropdownModule,
  NgbModalModule, NgbNavModule,
  NgbPaginationModule, NgbPopoverModule,
  NgbProgressbarModule, NgbToastModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { BaseUiRoutingModule } from './base-ui-routing.module';

import { AvatarsComponent } from './avatars/avatars.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { EmbedVideoComponent } from './embed-video/embed-video.component';
import { GeneralUiComponent } from './general-ui/general-ui.component';
import { GridComponent } from './grid/grid.component';
import { ImagesComponent } from './images/images.component';
import { ModalsComponent } from './modals/modals.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TabsAccordionComponent } from './tabs-accordion/tabs-accordion.component';
import { TooltipsPopoversComponent } from './tooltips-popovers/tooltips-popovers.component';
import { TypographyComponent } from './typography/typography.component';



@NgModule({
  declarations: [
    ButtonsComponent,
    CardsComponent,
    AvatarsComponent,
    TabsAccordionComponent,
    ModalsComponent,
    ProgressComponent,
    NotificationsComponent,
    PlaceholderComponent,
    SpinnersComponent,
    ImagesComponent,
    CarouselComponent,
    EmbedVideoComponent,
    DropdownsComponent,
    TooltipsPopoversComponent,
    GeneralUiComponent,
    TypographyComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    NgbAlertModule,
    NgbModalModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbCarouselModule,
    NgbProgressbarModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbNavModule,
    BaseUiRoutingModule
  ]
})
export class BaseUiModule { }
