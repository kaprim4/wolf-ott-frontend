import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UIndexComponent} from "./u-index/u-index.component";
import {UAddComponent} from "./u-add/u-add.component";
import {UEditComponent} from "./u-edit/u-edit.component";

const routes: Routes = [
    { path: '', component: UIndexComponent},
    { path: 'add', component: UAddComponent},
    { path: 'edit/:id', component: UEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
