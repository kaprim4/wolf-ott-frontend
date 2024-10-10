import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';



@NgModule({
  declarations: [UsersListComponent, AddUserComponent, ViewUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    SharedModule
  ]
})
export class UserModule { }
