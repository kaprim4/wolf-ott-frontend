import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {timer} from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    remainingTime: number; // Duration for the snackbar
    progress: number = 100; // Progress percentage

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: string; duration: number },
        private snackBarRef: MatSnackBarRef<NotificationComponent>
    ) {
        this.remainingTime = data.duration || 5000; // Default to 5000ms if no duration is provided
    }

    ngOnInit() {
        const duration = this.remainingTime;

        // Start a timer to update the progress
        const countdown$ = timer(0, 100).subscribe((elapsed) => {
            this.progress = 100 - (elapsed * 100) / (duration / 100); // Calculate progress percentage
            if (elapsed >= duration / 100) {
                countdown$.unsubscribe(); // Stop the timer
                this.close(); // Close the snackbar
            }
        });
    }

    close() {
        this.snackBarRef.dismiss(); // Close the snackbar
    }
}
