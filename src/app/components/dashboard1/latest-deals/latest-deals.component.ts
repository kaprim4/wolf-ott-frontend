import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-latest-deals',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './latest-deals.component.html',
})
export class AppLatestDealsComponent {
  constructor() {}
}
