import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration: number = 5000) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: { message, type: 'info', duration },
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  info(message: string, duration: number = 5000) {
    this.openSnackBar(message, 'info', duration);
  }

  warning(message: string, duration: number = 5000) {
    this.openSnackBar(message, 'warning', duration);
  }

  error(message: string, duration: number = 5000) {
    this.openSnackBar(message, 'error', duration);
  }

  success(message: string, duration: number = 5000) {
    this.openSnackBar(message, 'success', duration);
  }

  private openSnackBar(message: string, type: string, duration: number) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: { message, type, duration },
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'custom-snackbar-container',
    });
  }
}
