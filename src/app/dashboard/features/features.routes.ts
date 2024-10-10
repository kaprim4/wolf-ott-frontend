import { Routes } from '@angular/router';


export const FeatureRoutes: Routes = [
  {
    path: '',
    // component: AuthClassicLayout,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(module => module.UserModule)
      },
      {
        path: 'lines',
        loadChildren: () => import('./line/line.module').then(module => module.LineModule)
      },
      {
        path: 'contents',
        loadChildren: () => import('./content/content.module').then(module => module.ContentModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('./log/log.module').then(module => module.LogModule)
      },
    ],
  },
];
