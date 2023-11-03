import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  remainingTime: string[] = [];
  countDownDate = new Date("2022/11/19");
  tick = 1000;
  days!: string;
  hours!: string;
  minutes!: string;
  seconds!: string;

  constructor () { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.body.classList.add('authentication-bg');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('authentication-bg');
  }

  /**
   * calculates remaining time
   */
  countDown(event: any): void {
    this.hours = event.hours;
    this.minutes = event.minutes;
    this.seconds = event.seconds;
    this.days = event.days;
  }

  /**
   * checks if count down completed
   */
  isCompeted(): boolean {
    if (new Date() > this.countDownDate) {
      return true
    }
    return false;
  }
}
