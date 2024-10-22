import {Routes} from '@angular/router';
import {ActivityLogsListComponent} from './pages/activity-logs-list/activity-logs-list.component';
import {LiveConnectionsListComponent} from './pages/live-connections-list/live-connections-list.component';
import {UserLogsListComponent} from './pages/user-logs-list/user-logs-list.component';

export const LogRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Live Connections',
                },
                redirectTo: 'live-connections/list',
                pathMatch: 'full'
            },
            {
                path: 'live-connections/list',
                data: {
                    title: 'Live Connections',
                },
                component: LiveConnectionsListComponent
            },
            {
                path: 'activities/list',
                data: {
                    title: 'Activity Logs',
                },
                component: ActivityLogsListComponent
            },
            {
                path: 'users/list',
                data: {
                    title: 'Reseller Logs',
                },
                component: UserLogsListComponent
            },
        ],
    },
];
