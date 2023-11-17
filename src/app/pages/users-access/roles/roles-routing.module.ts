import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RIndexComponent} from "./r-index/r-index.component";
import {RAddComponent} from "./r-add/r-add.component";
import {REditComponent} from "./r-edit/r-edit.component";

const routes: Routes = [
    { path: '', component: RIndexComponent},
    { path: 'add', component: RAddComponent},
    { path: 'edit/:id', component: REditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
