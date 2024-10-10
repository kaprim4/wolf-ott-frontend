import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LineRoutes } from './line.routes';
import { UserLinesListComponent } from './pages/user-lines-list/user-lines-list.component';
import { MagDevicesListComponent } from './pages/mag-devices-list/mag-devices-list.component';
import { EnigmaDevicesListComponent } from './pages/enigma-devices-list/enigma-devices-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [UserLinesListComponent, MagDevicesListComponent, EnigmaDevicesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LineRoutes),
    SharedModule
  ]
})
export class LineModule { }
