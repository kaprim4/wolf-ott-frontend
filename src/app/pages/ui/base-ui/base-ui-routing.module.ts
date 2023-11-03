import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'avatars',
    component: AvatarsComponent
  },
  {
    path: 'tabs-accordions',
    component: TabsAccordionComponent
  },
  {
    path: 'modals',
    component: ModalsComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'placeholders',
    component: PlaceholderComponent
  },
  {
    path: 'spinners',
    component: SpinnersComponent
  },
  {
    path: 'images',
    component: ImagesComponent
  },
  {
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: 'embed-video',
    component: EmbedVideoComponent
  },
  {
    path: 'dropdowns',
    component: DropdownsComponent
  },
  {
    path: 'popovers-tooltips',
    component: TooltipsPopoversComponent
  },
  {
    path: 'general',
    component: GeneralUiComponent
  },
  {
    path: 'typography',
    component: TypographyComponent
  },
  {
    path: 'grid',
    component: GridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseUiRoutingModule { }
