import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LineRoutes } from './line.routes';
import { UserLinesListComponent } from './pages/user-lines-list/user-lines-list.component';
import { MagDevicesListComponent } from './pages/mag-devices-list/mag-devices-list.component';
import { EnigmaDevicesListComponent } from './pages/enigma-devices-list/enigma-devices-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserLineComponent } from './pages/add-user-line/add-user-line.component';
import { ViewUserLineComponent } from './pages/view-user-line/view-user-line.component';
import { M3UDialogComponent } from './components/m3u-dialog/m3u-dialog.component';
import { WolfGuardDialogComponent } from './components/wolf-guard-dialog/wolf-guard-dialog.component';



@NgModule({
  declarations: [UserLinesListComponent, MagDevicesListComponent, EnigmaDevicesListComponent, AddUserLineComponent, ViewUserLineComponent, M3UDialogComponent, WolfGuardDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LineRoutes),
    SharedModule
  ]
})
export class LineModule { }
