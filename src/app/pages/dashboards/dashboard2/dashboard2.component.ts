import { Component } from '@angular/core';

// components
import { AppWelcomeCardComponent } from '../../../components/dashboard2/welcome-card/welcome-card.component';
import { AppTopCardsComponent } from '../../../components/dashboard2/top-cards/top-cards.component';
import { AppProfileExpanceCpmponent } from '../../../components/dashboard2/profile-expance/profile-expance.component';
import { AppProductSalesComponent } from '../../../components/dashboard2/product-sales/product-sales.component';
import { AppTrafficDistributionComponent } from '../../../components/dashboard2/traffic-distribution/traffic-distribution.component';
import { AppNewGoalsComponent } from '../../../components/dashboard2/new-goals/new-goals.component';
import { AppProfileCardComponent } from '../../../components/dashboard2/profile-card/profile-card.component';
import { AppBlogCardComponent } from '../../../components/dashboard2/blog-card/blog-card.component';
import { AppTopEmployeesComponent } from '../../../components/dashboard2/top-employees/top-employees.component';
import { AppUpcomingSchedulesComponent } from '../../../components/dashboard2/upcoming-schedules/upcoming-schedules.component';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [
    AppWelcomeCardComponent,
    AppTopCardsComponent,
    AppProfileExpanceCpmponent,
    AppProductSalesComponent,
    AppTrafficDistributionComponent,
    AppNewGoalsComponent,
    AppProfileCardComponent,
    AppBlogCardComponent,
    AppTopEmployeesComponent,
    AppUpcomingSchedulesComponent,
  ],
  templateUrl: './dashboard2.component.html',
})
export class AppDashboard2Component {
  constructor() {}
}
