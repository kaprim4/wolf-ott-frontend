import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'user', loadChildren: () => import('./user/user.module')
            .then(m => m.UserModule)
    },
    {
        path: 'mag', loadChildren: () => import('./mag/mag.module')
            .then(m => m.MagModule)
    },
    {
        path: 'enigma', loadChildren: () => import('./enigma/enigma.module')
            .then(m => m.EnigmaModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LineRoutingModule {
}
