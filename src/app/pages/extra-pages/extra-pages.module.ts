import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LightboxModule } from 'ngx-lightbox';

// modules
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';

// components
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { FaqsComponent } from './faqs/faqs.component';
import { GalleryComponent } from './gallery/gallery.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { PricingComponent } from './pricing/pricing.component';
import { StarterComponent } from './starter/starter.component';
import { TimelineComponent } from './timeline/timeline.component';



@NgModule({
  declarations: [
    StarterComponent,
    PricingComponent,
    TimelineComponent,
    InvoiceComponent,
    FaqsComponent,
    GalleryComponent,
    Error404Component,
    MaintenanceComponent,
    ComingSoonComponent,
    Error500Component
  ],
  imports: [
    CommonModule,
    LightboxModule,
    UiModule,
    WidgetModule,
    ExtraPagesRoutingModule
  ]
})
export class ExtraPagesModule { }
