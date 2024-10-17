import { Routes } from '@angular/router';
import {AppDashboard1Component} from "../pages/dashboards/dashboard1/dashboard1.component";


export const DashboardsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: AppDashboard1Component,
                data: {
                    title: '',
                },
            },
        ],
    },
];
