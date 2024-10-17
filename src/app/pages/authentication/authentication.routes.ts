import {Routes} from '@angular/router';

import {AppErrorComponent} from './error/error.component';
import {AppMaintenanceComponent} from './maintenance/maintenance.component';
import {AppSideLoginComponent} from './side-login/side-login.component';
import {AppSideTwoStepsComponent} from './side-two-steps/side-two-steps.component';
import {LogoutComponent} from "./logout/logout.component";
import {AppSideForgotPasswordComponent} from "./side-forgot-password/side-forgot-password.component";


export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'login',
                },
                component: AppSideLoginComponent,
            },
            {
                path: 'error',
                data: {
                    title: 'error',
                },
                component: AppErrorComponent,
            },
            {
                path: 'maintenance',
                data: {
                    title: 'maintenance',
                },
                component: AppMaintenanceComponent,
            },
            {
                path: 'login',
                data: {
                    title: 'login',
                },
                component: AppSideLoginComponent,
            },
            {
                path: 'forgot-password',
                data: {
                    title: 'forgot password',
                },
                component: AppSideForgotPasswordComponent,
            },
            {
                path: 'logout',
                data: {
                    title: 'logout',
                },
                component: LogoutComponent,
            },
        ],
    },
];
