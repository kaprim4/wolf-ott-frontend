import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersListComponent } from './pages/users-list/users-list.component';



@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    SharedModule
  ]
})
export class UserModule { }
