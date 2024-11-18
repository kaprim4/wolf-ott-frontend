import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsListComponent } from './pages/applications-list/applications-list.component';
import { AddApplicationComponent } from './pages/add-application/add-application.component';
import { EditApplicationComponent } from './pages/edit-application/edit-application.component';

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
                component: ApplicationsListComponent
            },
            {
                path: 'add',
                component: AddApplicationComponent
            },
            {
                path: ':id',
                component: EditApplicationComponent
            },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
