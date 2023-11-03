import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraggableCardsComponent } from './draggable-cards/draggable-cards.component';
import { RangeslidersComponent } from './rangesliders/rangesliders.component';
import { SweetAlertsComponent } from './sweet-alerts/sweet-alerts.component';
import { TourPageComponent } from './tour-page/tour-page.component';
import { TreeViewComponent } from './tree-view/tree-view.component';

const routes: Routes = [
  {
    path: 'rangesliders',
    component: RangeslidersComponent
  },
  {
    path: 'sweet-alert',
    component: SweetAlertsComponent
  },
  {
    path: 'draggable-cards',
    component: DraggableCardsComponent
  },
  {
    path: 'tour',
    component: TourPageComponent
  },
  {
    path: 'tree-view',
    component: TreeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtendedUiRoutingModule { }
