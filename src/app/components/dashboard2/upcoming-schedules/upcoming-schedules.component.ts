import { Component } from '@angular/core';

import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-upcoming-schedules',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgScrollbarModule],
  templateUrl: './upcoming-schedules.component.html',
})
export class AppUpcomingSchedulesComponent {
  constructor() {}
}
