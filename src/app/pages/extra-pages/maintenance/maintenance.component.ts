import { Component, OnInit } from '@angular/core';

interface MaintenanceQuestion {
  icon?: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-pages-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  maintenanceQueries: MaintenanceQuestion[] = [];

  constructor () { }

  ngOnInit(): void {
    this.maintenanceQueries = [
      {
        icon: 'ti-stats-down',
        title: 'Why is the Site Down?',
        desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
      },
      {
        icon: 'ti-timer',
        title: 'What is the Downtime?',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical but the majority.',
      },
      {
        icon: 'ti-headphone-alt',
        title: 'Do you need Support?',
        desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embar... no-reply@domain.com",
      },
    ];
  }


  ngAfterViewInit(): void {
    document.body.classList.add('authentication-bg');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('authentication-bg');
  }

}
