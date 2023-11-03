import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { ContactsRoutingModule } from './contacts-routing.module';

import { MemberListComponent } from './member-list/member-list.component';
import { CommentBoxComponent } from './profile/comment-box/comment-box.component';
import { PostBoxComponent } from './profile/post-box/post-box.component';
import { ProfileComponent } from './profile/profile.component';
import { UserBoxComponent } from './profile/user-box/user-box.component';



@NgModule({
  declarations: [
    MemberListComponent,
    ProfileComponent,
    UserBoxComponent,
    PostBoxComponent,
    CommentBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    WidgetModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
