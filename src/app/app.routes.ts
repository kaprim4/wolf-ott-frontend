import {Routes} from '@angular/router';
import {BlankComponent} from './layouts/blank/blank.component';
import {FullComponent} from './layouts/full/full.component';
import {AuthGuard} from "./helpers/auth.guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./pages/dashboards/dashboards.routes').then(
                        (m) => m.DashboardsRoutes
                    ),
            },
            {
                path: 'starter',
                loadChildren: () =>
                    import('./pages/pages.routes').then((m) => m.PagesRoutes),
            },
            {
                path: 'apps',
                loadChildren: () =>
                    import('./dashboard/features/features.routes').then((m) => m.FeatureRoutes)
            },
        ],
    },
    {
        path: '',
        component: BlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren: () =>
                    import('./pages/authentication/authentication.routes').then(
                        (m) => m.AuthenticationRoutes
                    ),
            },
            {
                path: 'landingpage',
                loadChildren: () =>
                    import('./pages/theme-pages/landingpage/landingpage.routes').then(
                        (m) => m.LandingPageRoutes
                    ),
            },
        ],
    },
    // {
    //     path: '**',
    //     redirectTo: 'authentication/error',
    // },
];
