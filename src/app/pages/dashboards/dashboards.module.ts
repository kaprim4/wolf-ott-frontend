import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {WidgetModule} from 'src/app/shared/widget/widget.module';
import {DashboardOneComponent} from './dashboard-one/dashboard-one.component';
import {InboxComponent} from './dashboard-one/inbox/inbox.component';
import {ProjectsComponent} from './dashboard-one/projects/projects.component';
import {RevenueChartComponent} from './dashboard-one/revenue-chart/revenue-chart.component';
import {SalesChartComponent} from './dashboard-one/sales-chart/sales-chart.component';
import {StatisticsChartComponent} from './dashboard-one/statistics-chart/statistics-chart.component';
import {DashboardsRoutingModule} from './dashboards-routing.module';


@NgModule({
    declarations: [
        DashboardOneComponent,
        SalesChartComponent,
        StatisticsChartComponent,
        RevenueChartComponent,
        InboxComponent,
        ProjectsComponent
    ],
    imports: [
        CommonModule,
        NgApexchartsModule,
        NgbDropdownModule,
        WidgetModule,
        DashboardsRoutingModule
    ]
})
export class DashboardsModule {
}
