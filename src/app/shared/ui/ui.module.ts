import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { PreloaderComponent } from './preloader/preloader.component';
import { CountdownDirective } from './count-down/countdown.directive';



@NgModule({
  declarations: [
    DefaultLayoutComponent,
    PreloaderComponent,
    CountdownDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DefaultLayoutComponent,
    PreloaderComponent,
    CountdownDirective
  ]
})
export class UiModule { }
