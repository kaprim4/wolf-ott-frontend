import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsListComponent} from "./news-list/news-list.component";
import {NewsAddComponent} from "./news-add/news-add.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: NewsListComponent
            },
            {
                path: 'add',
                component: NewsAddComponent
            },
            {
                path: ':id',
                component: NewsEditComponent
            },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
