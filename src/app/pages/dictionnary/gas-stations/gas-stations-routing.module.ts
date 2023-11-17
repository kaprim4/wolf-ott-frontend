import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GsIndexComponent} from "./gs-index/gs-index.component";
import {GsEditComponent} from "./gs-edit/gs-edit.component";
import {GsAddComponent} from "./gs-add/gs-add.component";

const routes: Routes = [
    { path: '', component: GsIndexComponent},
    { path: 'add', component: GsAddComponent},
    { path: 'edit/:id', component: GsEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasStationsRoutingModule { }
