import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ComposeMailComponent } from './compose-mail/compose-mail.component';
import { EmailRoutingModule } from './email-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { MessageComponent } from './inbox/message/message.component';
import { LeftbarComponent } from './leftbar/leftbar.component';



@NgModule({
  declarations: [
    InboxComponent,
    ComposeMailComponent,
    LeftbarComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SimplebarAngularModule,
    QuillModule,
    NgbModalModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
