import {Routes} from '@angular/router';

import {AppErrorComponent} from './error/error.component';
import {AppMaintenanceComponent} from './maintenance/maintenance.component';
import {AppSideLoginComponent} from './side-login/side-login.component';
import {AppSideTwoStepsComponent} from './side-two-steps/side-two-steps.component';


export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'error',
                component: AppErrorComponent,
            },
            {
                path: 'maintenance',
                component: AppMaintenanceComponent,
            },
            {
                path: 'login',
                component: AppSideLoginComponent,
            },
            {
                path: 'side-two-steps',
                component: AppSideTwoStepsComponent,
            },
            {
                path: 'logout',
                component: AppSideLoginComponent,
            },
        ],
    },
];
