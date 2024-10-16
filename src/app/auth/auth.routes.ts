import {Routes} from '@angular/router';
import {AuthClassicLayout} from './layouts/auth-classic-layout/classic.layout';
import {SigninPage} from './pages/signin/signin.page';
import {SignupPage} from './pages/signup/signup.page';

export const AuthRoutes: Routes = [
    {
        path: '',
        component: AuthClassicLayout,
        children: [
            {
                path: '',
                redirectTo: 'signin',
                pathMatch: 'full'
            },
            {
                path: 'signin',
                component: SigninPage
            },
            {
                path: 'signup',
                component: SignupPage
            },
        ],
    },
];
