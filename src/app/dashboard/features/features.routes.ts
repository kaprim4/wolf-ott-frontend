import {Routes} from '@angular/router';


export const FeatureRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'users',
                data: {
                    title: 'Users',
                },
                pathMatch: 'full'
            },
            {
                path: 'users',
                data: {
                    title: 'Users',
                },
                loadChildren: () => import('./user/user.module').then(module => module.UserModule)
            },
            {
                path: 'lines',
                data: {
                    title: 'Lines',
                },
                loadChildren: () => import('./line/line.module').then(module => module.LineModule)
            },
            {
                path: 'contents',
                data: {
                    title: 'Contents',
                },
                loadChildren: () => import('./content/content.module').then(module => module.ContentModule)
            },
            {
                path: 'logs',
                data: {
                    title: 'Logs',
                },
                loadChildren: () => import('./log/log.module').then(module => module.LogModule)
            },
            {
                path: 'bundles',
                data: {
                    title: 'Bundles',
                },
                loadChildren: () => import('./bundle/bundle.module').then(module => module.BundleModule)
            },
        ],
    },
];
