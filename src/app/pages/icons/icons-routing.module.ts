import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DripiconsComponent } from './dripicons/dripicons.component';
import { FeatherComponent } from './feather/feather.component';
import { FontAwesomeComponent } from './font-awesome/font-awesome.component';
import { MdiComponent } from './mdi/mdi.component';
import { ThemifyComponent } from './themify/themify.component';

const routes: Routes = [
  { path: 'feather', component: FeatherComponent },
  { path: 'mdi', component: MdiComponent },
  { path: 'font-awesome', component: FontAwesomeComponent },
  { path: 'dripicons', component: DripiconsComponent },
  { path: 'themify', component: ThemifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
