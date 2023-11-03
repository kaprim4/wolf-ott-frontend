import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Directive({
  selector: '[countDownDate]'
})
export class CountdownDirective {

  @Input() countDownDate!: Date;
  @Input() tick!: number;
  days!: string;
  hours!: string;
  minutes!: string;
  seconds!: string;
  @Output() counterChanged = new EventEmitter<any>();

  constructor () {
    this.countDown();
  }

  /**
   * calculates remaining time
   */
  countDown(): void {

    // Update the count down every 1 second
    let x = setInterval(() => {

      // Get todays date and time
      let now = new Date();

      // Find the distance between now an the count down date
      let difference = Math.abs(Date.parse(String(this.countDownDate)) - Date.parse(String(now))) / 1000;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(difference / 86400);
      difference -= days * 86400;
      let hours = Math.floor(difference / 3600) % 24;
      difference -= hours * 3600;
      let minutes = Math.floor(difference / 60) % 60;
      difference -= minutes * 60;
      let seconds = Math.floor((difference % (1000 * 60)));

      this.hours = ("00" + hours).slice(-2);
      this.minutes = ("00" + minutes).slice(-2);
      this.seconds = ("00" + seconds).slice(-2);
      this.days = days < 10 ? ("00" + days).slice(-2) : String(days);


      this.counterChanged.emit({ hours: this.hours, minutes: this.minutes, seconds: this.seconds, days: this.days });

      if (difference < 0) {
        clearInterval(x);
      }
    }, 1000);
  }
}
