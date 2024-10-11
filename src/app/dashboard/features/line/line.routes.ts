import { Routes } from '@angular/router';
import { UserLinesListComponent } from './pages/user-lines-list/user-lines-list.component';
import { MagDevicesListComponent } from './pages/mag-devices-list/mag-devices-list.component';
import { EnigmaDevicesListComponent } from './pages/enigma-devices-list/enigma-devices-list.component';
import { AddUserLineComponent } from './pages/add-user-line/add-user-line.component';
import { ViewUserLineComponent } from './pages/view-user-line/view-user-line.component';


export const LineRoutes: Routes = [
  {
    path: '',
    // component: AuthClassicLayout,
    children: [
      {
        path: '',
        redirectTo: 'users/list',
        pathMatch: 'full'
      },
      {
        path: 'users/list',
        component: UserLinesListComponent
      },
      {
        path: 'users/add',
        component: AddUserLineComponent
      },
      {
        path: 'users/:id',
        component: ViewUserLineComponent
      },
      {
        path: 'devices/mag/list',
        component: MagDevicesListComponent
      },
      {
        path: 'devices/enigma/list',
        component: EnigmaDevicesListComponent
      },
    ],
  },
];
