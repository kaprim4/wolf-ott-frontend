import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UIndexComponent} from "./u-index/u-index.component";

const routes: Routes = [
    { path: '', component: UIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
