import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {LineList} from 'src/app/shared/models/line';
import {Patch} from 'src/app/shared/models/patch';
import {LineService} from 'src/app/shared/services/line.service';
import {NotificationService} from "../../../../../shared/services/notification.service";
import {LoggingService} from "../../../../../services/logging.service";

@Component({
    selector: 'app-wolf-guard-dialog',
    templateUrl: './wolf-guard-dialog.component.html',
    styleUrl: './wolf-guard-dialog.component.scss'
})
export class WolfGuardDialogComponent {

    active: boolean = false;
    line: LineList;
    loading: boolean = false;

    constructor(
        private lineService: LineService,
        public dialogRef: MatDialogRef<WolfGuardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { line: LineList },
        private notificationService: NotificationService,
        private loggingService: LoggingService
    ) {
        this.line = data.line;
    }

    toggleVpn() {
        const id = this.line.id;
        const patch: Patch = {
            op: 'replace',
            path: '/useVPN',
            value: this.line.useVPN
        }
        this.lineService.patch(id, patch).subscribe({
            next:line => {
                this.loggingService.log("Line updated successfuly", line);
                this.notificationService.success("Line updated successfuly");
            },
            error: error => {
                this.loggingService.log("An error occurred", error);
                this.notificationService.error("An error occurred", error);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    refreshVPN() {
        const id = this.line.id;
        this.loading = true;
        this.lineService.refreshVPN(id).subscribe({
            next:line => {
                this.loggingService.log("Line VPN changed successfuly", line);
                this.notificationService.success("Line VPN changed successfuly");
            },
            error: error => {
                this.loggingService.log("An error occurred", error);
                this.notificationService.error("An error occurred", error);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
