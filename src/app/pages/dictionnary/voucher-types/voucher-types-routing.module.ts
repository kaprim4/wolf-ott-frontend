import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VtIndexComponent} from "./vt-index/vt-index.component";
import {VtAddComponent} from "./vt-add/vt-add.component";
import {VtEditComponent} from "./vt-edit/vt-edit.component";

const routes: Routes = [
    {path: '', component: VtIndexComponent},
    {path: 'add', component: VtAddComponent},
    {path: 'edit/:id', component: VtEditComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VoucherTypesRoutingModule {
}
