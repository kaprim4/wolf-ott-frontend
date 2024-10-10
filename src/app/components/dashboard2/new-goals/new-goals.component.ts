import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-new-goals',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatProgressBarModule],
  templateUrl: './new-goals.component.html',
})
export class AppNewGoalsComponent {}
