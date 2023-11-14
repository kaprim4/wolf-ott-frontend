import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpEditComponent} from "./sp-edit/sp-edit.component";
import {SpDeleteComponent} from "./sp-delete/sp-delete.component";
import {SpIndexComponent} from "./sp-index/sp-index.component";
import {SpAddComponent} from "./sp-add/sp-add.component";

const routes: Routes = [
    { path: '', component: SpIndexComponent},
    { path: 'add', component: SpAddComponent},
    { path: 'edit/:id', component: SpEditComponent},
    { path: 'delete/:id', component: SpDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorsRoutingModule { }
