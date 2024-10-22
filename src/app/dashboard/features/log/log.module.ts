import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LogRoutes} from './log.routes';
import {LiveConnectionsListComponent} from "./pages/live-connections-list/live-connections-list.component";
import {UserLogsListComponent} from "./pages/user-logs-list/user-logs-list.component";
import {ActivityLogsListComponent} from "./pages/activity-logs-list/activity-logs-list.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        LiveConnectionsListComponent,
        UserLogsListComponent,
        ActivityLogsListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(LogRoutes),
        SharedModule
    ]
})
export class LogModule {
}
