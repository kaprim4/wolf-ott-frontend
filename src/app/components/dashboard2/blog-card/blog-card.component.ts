import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardComponent {
  constructor() {}
}
