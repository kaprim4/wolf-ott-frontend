import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatProgressBarModule],
  templateUrl: './profile-card.component.html',
})
export class AppProfileCardComponent {}
