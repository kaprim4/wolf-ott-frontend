import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';


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

    ],
  },
];
