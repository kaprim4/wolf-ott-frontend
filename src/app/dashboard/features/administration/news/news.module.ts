import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import {NewsAddComponent} from "./news-add/news-add.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";
import {NewsListComponent} from "./news-list/news-list.component";
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {NewsViewComponent} from "./news-view/news-view.component";
import {ParametersModule} from "../parameters/parameters.module";


@NgModule({
  declarations: [
      NewsAddComponent,
      NewsEditComponent,
      NewsListComponent,
      NewsViewComponent
  ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        ParametersModule
    ]
})
export class NewsModule { }
