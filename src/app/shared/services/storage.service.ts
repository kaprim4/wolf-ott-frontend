import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  private storageChangeSubject = new Subject<string>();
  storageChange$ = this.storageChangeSubject.asObservable();
  private previousValue: { [key: string]: string } = {};
  private checkInterval: any;

  constructor(private ngZone: NgZone) {
    // Initialize previous values
    this.initializePreviousValues();

    // Set up an interval to check for changes
    this.checkInterval = setInterval(() => this.checkForChanges(), 100); // Check every second
  }

  private initializePreviousValues() {
    // Initialize previous values from local storage
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        this.previousValue[key] = localStorage.getItem(key) || '';
      }
    }
  }

  private checkForChanges() {
    // Check all keys in local storage for changes
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const currentValue = localStorage.getItem(key) || '';
        if (this.previousValue[key] !== currentValue) {
          this.ngZone.run(() => {
            this.storageChangeSubject.next(key); // Emit the changed key
            this.previousValue[key] = currentValue; // Update previous value
          });
        }
      }
    }
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.storageChangeSubject.next(key); // Emit change
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.storageChangeSubject.next(key); // Emit change
  }

  ngOnDestroy() {
    // Clear the interval on service destruction
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}
