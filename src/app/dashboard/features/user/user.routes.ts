import {Routes} from '@angular/router';
import {UsersListComponent} from './pages/users-list/users-list.component';
import {ViewUserComponent} from './pages/view-user/view-user.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";


export const UserRoutes: Routes = [
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
                component: UsersListComponent
            },
            {
                path: 'add',
                component: AddUserComponent
            },
            {
                path: 'profile',
                component: UserProfileComponent
            },
            {
                path: ':id',
                component: ViewUserComponent
            },
        ],
    },
];
