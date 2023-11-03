import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { GalleryComponent } from './gallery/gallery.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PricingComponent } from './pricing/pricing.component';
import { StarterComponent } from './starter/starter.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
    path: 'starter',
    component: StarterComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'faq',
    component: FaqsComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule { }
