import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'preset', loadChildren: () => import('./preset/preset.module')
            .then(m => m.PresetModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DictionnaryRoutingModule {
}
