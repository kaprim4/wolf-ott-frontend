import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { bundleRoutes } from './bundle.routes';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BouquetsListComponent } from './bouquets-list/bouquets-list.component';
import { PresetsListComponent } from './presets-list/presets-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ViewPackageComponent } from './view-package/view-package.component';
import { AddBouquetComponent } from './add-bouquet/add-bouquet.component';
import { ViewBouquetComponent } from './view-bouquet/view-bouquet.component';
import { AddPresetComponent } from './add-preset/add-preset.component';



@NgModule({
  declarations: [PackagesListComponent, BouquetsListComponent, PresetsListComponent, AddPackageComponent, ViewPackageComponent, AddBouquetComponent, ViewBouquetComponent, AddPresetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bundleRoutes),
    SharedModule
  ]
})
export class BundleModule { }
