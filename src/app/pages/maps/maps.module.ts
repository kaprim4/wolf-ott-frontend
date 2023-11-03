import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetModule } from 'src/app/shared/widget/widget.module';

import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { MapsRoutingModule } from './maps-routing.module';
import { VectorMapsComponent } from './vector-maps/vector-maps.component';

// env variable
import { environment } from 'src/environments/environment.prod';


@NgModule({
  declarations: [
    VectorMapsComponent,
    GoogleMapsComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
    WidgetModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
