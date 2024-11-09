import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
                path: 'ranking',
                data: {
                    title: 'Ranking',
                },
                loadChildren: () => import('./ranking/ranking.module').then(module => module.RankingModule)
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
