import { Routes } from '@angular/router';
import { ActivityLogsListComponent } from './pages/activity-logs-list/activity-logs-list.component';
import { LiveConnectionsListComponent } from './pages/live-connections-list/live-connections-list.component';
import { UserLogsListComponent } from './pages/user-logs-list/user-logs-list.component';


export const LogRoutes: Routes = [
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
        path: 'live-connections/list',
        component: LiveConnectionsListComponent
      },
      {
        path: 'activities/list',
        component: ActivityLogsListComponent
      },
      {
        path: 'users/list',
        component: UserLogsListComponent
      },
    ],
  },
];
