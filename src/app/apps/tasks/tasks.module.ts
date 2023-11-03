import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng-select2-component';
import { SortablejsModule } from 'ngx-sortablejs';

import { TasksRoutingModule } from './tasks-routing.module';

import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskDetailsComponent } from './task-details/task-details.component';



@NgModule({
  declarations: [
    KanbanBoardComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select2Module,
    SortablejsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbModalModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
