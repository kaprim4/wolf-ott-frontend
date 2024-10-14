import { Routes } from '@angular/router';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ViewPackageComponent } from './view-package/view-package.component';
import { BouquetsListComponent } from './bouquets-list/bouquets-list.component';
import { AddBouquetComponent } from './add-bouquet/add-bouquet.component';
import { ViewBouquetComponent } from './view-bouquet/view-bouquet.component';
import { PresetsListComponent } from './presets-list/presets-list.component';
import { AddPresetComponent } from './add-preset/add-preset.component';
import { ViewPresetComponent } from './view-preset/view-preset.component';


export const bundleRoutes: Routes = [
  {
    path: '',
    // component: AuthClassicLayout,
    children: [
      {
        path: '',
        redirectTo: 'packages/list',
        pathMatch: 'full'
      },
      {
        path: 'packages/list',
        component: PackagesListComponent
      },
      {
        path: 'packages/add',
        component: AddPackageComponent
      },
      {
        path: 'packages/:id',
        component: ViewPackageComponent
      },
      {
        path: 'bouquets/list',
        component: BouquetsListComponent
      },
      {
        path: 'bouquets/add',
        component: AddBouquetComponent
      },
      {
        path: 'bouquets/:id',
        component: ViewBouquetComponent
      },
      {
        path: 'presets/list',
        component: PresetsListComponent
      },
      {
        path: 'presets/add',
        component: AddPresetComponent
      },
      {
        path: 'presets/:id',
        component: ViewPresetComponent
      },
    ],
  },
];
