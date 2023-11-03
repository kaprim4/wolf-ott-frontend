import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmMailComponent} from './confirm-mail/confirm-mail.component';
import {LockScreenComponent} from './lock-screen/lock-screen.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'lock-screen',
        component: LockScreenComponent
    },
    {
        path: 'confirm-mail',
        component: ConfirmMailComponent
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
