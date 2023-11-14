import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'gas-stations', loadChildren: () => import('./gas-stations/gas-stations.module')
            .then(m => m.GasStationsModule)
    },
    {
        path: 'supervisors', loadChildren: () => import('./supervisors/supervisors.module')
            .then(m => m.SupervisorsModule)
    },
    {
        path: 'companies', loadChildren: () => import('./companies/companies.module')
            .then(m => m.CompaniesModule)
    },
    {
        path: 'cities', loadChildren: () => import('./cities/cities.module')
            .then(m => m.CitiesModule)
    },
    {
        path: 'regions', loadChildren: () => import('./regions/regions.module')
            .then(m => m.RegionsModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DictionnaryRoutingModule {
}
