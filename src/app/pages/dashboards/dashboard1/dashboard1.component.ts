import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

// components
import { AppCongratulateCardComponent } from '../../../components/dashboard1/congratulate-card/congratulate-card.component';
import { AppPaymentsComponent } from '../../../components/dashboard1/payments/payments.component';
import { AppProductsComponent } from '../../../components/dashboard1/products/products.component';
import { AppLatestDealsComponent } from '../../../components/dashboard1/latest-deals/latest-deals.component';
import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
import { AppVisitUsaComponent } from '../../../components/dashboard1/visit-usa/visit-usa.component';
import { AppLatestReviewsComponent } from '../../../components/dashboard1/latest-reviews/latest-reviews.component';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    TablerIconsModule,
    AppCongratulateCardComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppTopProjectsComponent,
    AppPaymentsComponent,
    AppLatestDealsComponent,
    AppVisitUsaComponent,
    AppProductsComponent,
    AppLatestReviewsComponent,
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component {
  constructor() {}
}
