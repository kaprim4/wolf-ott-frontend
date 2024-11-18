import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParametersComponent} from "./parameters/parameters.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'news',
                data: {
                    title: 'News',
                },
                pathMatch: 'full'
            },
            {
                path: 'news',
                data: {
                    title: 'News',
                },
                loadChildren: () => import('./news/news.module').then(module => module.NewsModule)
            },
            {
                path: 'applications',
                data: {
                    title: 'Applications',
                },
                loadChildren: () => import('./applications/applications.module').then(module => module.ApplicationsModule)
            },
            {
                path: 'ranking',
                data: {
                    title: 'Ranking',
                },
                loadChildren: () => import('./ranking/ranking.module').then(module => module.RankingModule)
            },
            {
                path: 'parameters',
                data: {
                    title: 'Parameters',
                },
                component: ParametersComponent
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
