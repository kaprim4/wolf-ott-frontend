import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { bundleRoutes } from './bundle.routes';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BouquetsListComponent } from './bouquets-list/bouquets-list.component';
import { PresetsListComponent } from './presets-list/presets-list.component';
import { AddPackageComponent } from './add-package/add-package.component';



@NgModule({
  declarations: [PackagesListComponent, BouquetsListComponent, PresetsListComponent, AddPackageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bundleRoutes),
    SharedModule
  ]
})
export class BundleModule { }
