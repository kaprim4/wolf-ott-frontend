import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutes } from './features.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(FeatureRoutes)
  ]
})
export class FeaturesModule { }
