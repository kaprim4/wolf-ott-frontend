import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CpEditComponent} from "./cp-edit/cp-edit.component";
import {CpDeleteComponent} from "./cp-delete/cp-delete.component";
import {CpIndexComponent} from "./cp-index/cp-index.component";
import {CpAddComponent} from "./cp-add/cp-add.component";

const routes: Routes = [
    { path: '', component: CpIndexComponent},
    { path: 'add', component: CpAddComponent},
    { path: 'edit/:id', component: CpEditComponent},
    { path: 'delete/:id', component: CpDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
