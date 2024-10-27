import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexPlotOptions,
    NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from '../../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';
import {LineList} from "../../../shared/models/line";
import {UserService} from "../../../shared/services/user.service";
import {TokenService} from "../../../shared/services/token.service";
import {StatsService} from "../../../shared/services/stats.service";
import {LineService} from "../../../shared/services/line.service";
import {DecimalPipe, NgIf} from "@angular/common";

export interface customersChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
}

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [MaterialModule, NgApexchartsModule, TablerIconsModule, DecimalPipe, NgIf],
    templateUrl: './customers.component.html',
})
export class AppCustomersComponent implements OnInit {

    @ViewChild('chart') chart: ChartComponent = Object.create(null);
    public customersChart!: Partial<customersChart> | any;

    lines: LineList[] = [];
    lastRegistredLineloading: boolean = true;
    lastWeekCountLoading: boolean = true;
    error: string | null = null;
    growth: number = 0;
    lastWeekCount: number = 0;
    lastSixMonths: number[] = [];

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private statsService: StatsService,
        private lineService: LineService
    ) {

    }

    loadLine() {
        this.lastRegistredLineloading = true;
        this.lastWeekCountLoading = true;
        this.lineService.getLastRegisteredLines().subscribe((data) => {
            this.lines = data;
            this.lastRegistredLineloading = false;
            this.calculateGrowth();

            this.lineService.getLastWeekCount().subscribe((count) => {
                this.lastWeekCount = count;
                this.lineService.getCreatedLinesLastSixMonths().subscribe((data) => {
                    this.prepareChartData(data);
                    this.lastWeekCountLoading = false;
                });
            });
        });
    }

    calculateGrowth(): void {
        const currentCount = this.lines.length;
        if (this.lastWeekCount > 0) {
            this.growth = ((currentCount - this.lastWeekCount) / this.lastWeekCount) * 100;
        }
    }

    ngOnInit(): void {
        this.loadLine();
    }

    private prepareChartData(data: { [key: string]: number }) {
        const seriesData: number[] = [];
        const labels = Object.keys(data).reverse(); // Pour les mois, si besoin d'ordre
        labels.forEach(month => {
            seriesData.push(data[month]);
        });

        this.customersChart = {
            series: [
                {
                    name: 'Lignes Créées',
                    data: seriesData,
                },
            ],
            chart: {
                type: 'area',
                fontFamily: 'inherit',
                foreColor: '#adb0bb',
                height: 103,
                sparkline: {
                    enabled: true,
                },
                group: 'sparklines',
            },
            colors: ['#0085db'],
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0,
                    inverseColors: false,
                    opacityFrom: 0.05,
                    opacityTo: 0,
                    stops: [20, 180],
                },
            },
            markers: {
                size: 0,
            },
            tooltip: {
                enabled: false,
            },
        };
        console.log(this.customersChart);
    }
}
