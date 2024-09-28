import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresetCreateComponent } from './preset-create/preset-create.component';
import { PresetListComponent } from './preset-list/preset-list.component';
import { PresetEditComponent } from './preset-edit/preset-edit.component';


const routes: Routes = [
    { path: '', component: PresetListComponent},
    { path: 'add', component: PresetCreateComponent },
    { path: 'edit/:id', component: PresetEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresetRoutingModule { }
