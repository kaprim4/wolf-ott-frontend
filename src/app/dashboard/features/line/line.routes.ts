import { Routes } from '@angular/router';
import { UserLinesListComponent } from './pages/user-lines-list/user-lines-list.component';
import { MagDevicesListComponent } from './pages/mag-devices-list/mag-devices-list.component';
import { EnigmaDevicesListComponent } from './pages/enigma-devices-list/enigma-devices-list.component';


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
