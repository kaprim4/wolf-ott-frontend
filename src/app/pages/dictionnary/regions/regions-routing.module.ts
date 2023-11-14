import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RgEditComponent} from "./rg-edit/rg-edit.component";
import {RgDeleteComponent} from "./rg-delete/rg-delete.component";
import {RgIndexComponent} from "./rg-index/rg-index.component";
import {RgAddComponent} from "./rg-add/rg-add.component";

const routes: Routes = [
    { path: '', component: RgIndexComponent},
    { path: 'add', component: RgAddComponent},
    { path: 'edit/:id', component: RgEditComponent},
    { path: 'delete/:id', component: RgDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
