import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexPlotOptions,
    ApexFill,
    ApexMarkers,
    NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from '../../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';
import {UserDetail} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";
import {TokenService} from "../../../shared/services/token.service";
import {StatsService} from "../../../shared/services/stats.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IDashboardStat} from "../../../shared/models/stats";
import {ArticleService} from "../../../shared/services/article.service";
import {Article} from "../../../shared/models/article";

interface month {
    value: string;
    viewValue: string;
}

interface stats {
    id: number;
    color: string;
    title: string;
    subtitle: string;
    icon: string;
}

interface cardimgs {
    id: number;
    time: string;
    imgSrc: string;
    user: string;
    title: string;
    views: string;
    category: string;
    comments: number;
    date: string;
}

export interface revenueChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    grid: ApexGrid;
    marker: ApexMarkers;
}

@Component({
    selector: 'app-congratulate-card',
    standalone: true,
    imports: [NgApexchartsModule, MaterialModule, TablerIconsModule],
    templateUrl: './congratulate-card.component.html',
})
export class AppCongratulateCardComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent = Object.create(null);

    public revenueChart!: Partial<revenueChart> | any;

    months: month[] = [
        {value: 'mar', viewValue: 'March 2023'},
        {value: 'apr', viewValue: 'April 2023'},
        {value: 'june', viewValue: 'June 2023'},
    ];

    loggedInUser: any;
    user: any;

    openConnections: number = 0;
    onlineUsers: number = 0;
    activeAccounts: number = 0;
    creditsAssigned: number = 0;
    isStatLoading: boolean = false;

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private statsService: StatsService,
        private articleService: ArticleService,
    ) {
        this.revenueChart = {
            series: [
                {
                    name: '',
                    data: [0, 20, 15, 19, 14, 25, 32],
                    color: '#0085db',
                },
                {
                    name: '',
                    data: [0, 12, 19, 13, 26, 16, 25],
                    color: '#46caeb',
                },
            ],

            chart: {
                type: 'line',
                fontFamily: "inherit",
                foreColor: '#adb0bb',
                toolbar: {
                    show: false,
                },
                height: 260,
                stacked: false,
            },

            legend: {
                show: false,
            },
            stroke: {
                width: 3,
                curve: "smooth",
            },
            grid: {
                show: true,
                borderColor: 'rgba(0,0,0,0.1)',
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                labels: {
                    show: true,
                },
                type: "category",
                categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: function (value: any) {
                        return value + "k";
                    },
                },
            },
            tooltip: {
                theme: "dark",
                fillSeriesColor: false,
            },
        };
    }

    /*
    {
        id: 1,
        time: '2 mins Read',
        imgSrc: '/assets/images/blog/blog-img1.jpg',
        user: '/assets/images/profile/user-1.jpg',
        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        views: '9,125',
        category: 'Social',
        comments: 3,
        date: 'Mon, Dec 23',
    }
    */
    cardimgs: cardimgs[] = [];

    ngOnInit(): void {
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });
        this.getStats();
        this.articleService.getAllArticles<Article>().subscribe((value: Article[]) => {
            if (value.length > 0) {
                value.map(article => {
                    this.cardimgs.push({
                        id: article.id,
                        time: '2 mins Read',
                        imgSrc: article.thumbnail,
                        user: '/assets/images/profile/user-1.jpg',
                        title: article.title,
                        views: '9,125',
                        category: 'Social',
                        comments: 3,
                        date: 'Mon, Dec 23',
                    })
                })
            }
        })
    }

    getStats(): void {
        this.isStatLoading = true;
        const rStart = Date.now();
        this.statsService.getStats("dashboard").subscribe(
            (data: HttpResponse<IDashboardStat>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.openConnections = data.body.open_connections;
                    this.onlineUsers = data.body.online_users;
                    this.activeAccounts = data.body.active_accounts;
                    this.creditsAssigned = data.body.credits_assigned;
                    const delay = 1000 - (Date.now() - rStart);
                    setTimeout(() => this.getStats(), delay > 0 ? delay : 0);
                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    setTimeout(() => this.getStats(), 1000);
                    console.log(err.message)
                }
            }, ((): void => {
                this.isStatLoading = false;
            })
        );
    }

    stats: stats[] = [
        {
            id: 1,
            color: 'success',
            title: `${this.openConnections} Connections`,
            subtitle: 'Live Connections',
            icon: 'plug-connected',
        },
        {
            id: 2,
            color: 'info',
            title: `${this.onlineUsers} Line online`,
            subtitle: 'Live Connections',
            icon: 'users',
        },
        {
            id: 3,
            color: 'warning',
            title: `${this.activeAccounts} Active Lines`,
            subtitle: 'Manage Lines',
            icon: 'activity-heartbeat',
        },
        {
            id: 4,
            color: 'info',
            title: `${this.creditsAssigned} Assigned Credits`,
            subtitle: 'Users',
            icon: 'coins',
        },
    ];
}
