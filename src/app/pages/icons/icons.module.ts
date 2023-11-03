import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsRoutingModule } from './icons-routing.module';
import { FeatherComponent } from './feather/feather.component';
import { MdiComponent } from './mdi/mdi.component';
import { DripiconsComponent } from './dripicons/dripicons.component';
import { FontAwesomeComponent } from './font-awesome/font-awesome.component';
import { ThemifyComponent } from './themify/themify.component';


@NgModule({
  declarations: [
    FeatherComponent,
    MdiComponent,
    DripiconsComponent,
    FontAwesomeComponent,
    ThemifyComponent
  ],
  imports: [
    CommonModule,
    IconsRoutingModule
  ]
})
export class IconsModule { }
