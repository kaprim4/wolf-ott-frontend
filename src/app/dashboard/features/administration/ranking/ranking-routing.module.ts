import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersListComponent} from "../../user/pages/users-list/users-list.component";
import {AddUserComponent} from "../../user/pages/add-user/add-user.component";
import {ViewUserComponent} from "../../user/pages/view-user/view-user.component";
import {RankListComponent} from "./rank-list/rank-list.component";

const routes: Routes = [
    {
        path: '',
        // component: AuthClassicLayout,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: RankListComponent,
            },
            /*{
                path: 'add',
                component: AddUserComponent
            },
            {
                path: ':id',
                component: ViewUserComponent
            },*/
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RankingRoutingModule {
}
