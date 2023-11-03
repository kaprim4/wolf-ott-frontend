import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableAdvancedComponent } from './advanced/advanced.component';
import { TableBasicComponent } from './basic/basic.component';

const routes: Routes = [
  {
    path: 'basic',
    component: TableBasicComponent
  },
  {
    path: 'advanced',
    component: TableAdvancedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
