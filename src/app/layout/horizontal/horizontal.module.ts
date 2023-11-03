import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { HorizontalLayoutComponent } from './layout/layout.component';
import { TopnavComponent } from './topnav/topnav.component';

@NgModule({
  declarations: [
    HorizontalLayoutComponent,
    TopnavComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HorizontalLayoutComponent
  ]
})
export class HorizontalModule { }
