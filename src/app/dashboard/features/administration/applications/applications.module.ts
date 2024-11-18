import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListComponent } from './pages/applications-list/applications-list.component';
import { AddApplicationComponent } from './pages/add-application/add-application.component';
import { EditApplicationComponent } from './pages/edit-application/edit-application.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing.module';



@NgModule({
  declarations: [ApplicationsListComponent, AddApplicationComponent, EditApplicationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }
