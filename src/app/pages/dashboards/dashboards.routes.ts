import { Routes } from '@angular/router';

// dashboards
import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';

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
      {
        path: 'dashboard2',
        component: AppDashboard2Component,
        data: {
          title: '',
        },
      },
    ],
  },
];
