import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { SettingsComponent } from './pages/settings/settings.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    // component: AuthClassicLayout,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'apps',
        loadChildren: () => import('./features/features.module').then(module => module.FeaturesModule)
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
    ],
  },
];
