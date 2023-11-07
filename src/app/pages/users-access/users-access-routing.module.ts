import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ButtonsComponent} from "../ui/base-ui/buttons/buttons.component";
import {UIndexComponent} from "./users/u-index/u-index.component";

const routes: Routes = [
    {
        path: 'user-index',
        component: UIndexComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAccessRoutingModule { }
