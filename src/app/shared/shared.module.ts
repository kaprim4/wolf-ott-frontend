import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NotificationComponent } from './components/notification/notification.component';
import { QuickM3uComponent } from './components/quick-m3u/quick-m3u.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    NotificationComponent,
    QuickM3uComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    NgxMatSelectSearchModule,
    DragDropModule
  ]
})
export class SharedModule { }

