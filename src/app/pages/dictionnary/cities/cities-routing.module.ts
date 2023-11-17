import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CEditComponent} from "./c-edit/c-edit.component";
import {CIndexComponent} from "./c-index/c-index.component";
import {CAddComponent} from "./c-add/c-add.component";

const routes: Routes = [
    { path: '', component: CIndexComponent},
    { path: 'add', component: CAddComponent},
    { path: 'edit/:id', component: CEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
