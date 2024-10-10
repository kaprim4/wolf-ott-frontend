import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';


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
        path: ':id',
        component: ViewUserComponent
      },
      {
        path: 'add',
        component: AddUserComponent
      },
    ],
  },
];
