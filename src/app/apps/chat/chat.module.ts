import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';

import { ChatAreaComponent } from './chat-area/chat-area.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatUsersComponent,
    ChatAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SimplebarAngularModule,
    NgbDropdownModule,
    UiModule,
    WidgetModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
