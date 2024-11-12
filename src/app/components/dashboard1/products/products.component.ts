import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {UserDetail} from "../../../shared/models/user";
import {TokenService} from "../../../shared/services/token.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {DatePipe} from "@angular/common";
import {RankingService} from "../../../shared/services/ranking.service";
import {Rank} from "../../../shared/models/rank";
import {LineService} from "../../../shared/services/line.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    imports: [
        MatCardHeader,
        MatCard,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        DatePipe,
        MatProgressBar
    ],
    standalone: true
})
export class AppProductsComponent implements OnInit {

    loggedInUser: any;
    user: any;
    registrationDate: any;
    credits: number;
    rank: Rank = {
        id: 0,
        title: '',
        maxPoints: 0,
        minPoints: 0,
        badgeImage: ''
    };
    imagePreview: string | ArrayBuffer | null = null;
    loading: boolean = true;

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private rankingService: RankingService,
        private lineService: LineService,
        protected notificationService: NotificationService
    ) {

    }

    ngOnInit(): void {
        this.loading = true;
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe(
            {
                next: (user) => {
                    this.user = user;
                    this.registrationDate = user.dateRegistered
                },
                error: (err) => {
                    this.notificationService.error('Error while get User');
                    console.error("'Error while get User'", err);
                },
                complete: () => {
                    this.lineService.getAllLinesWithMemberId(this.user.id).subscribe(
                        {
                            next: (count) => {
                                this.credits = count
                            },
                            error: (err) => {
                                this.notificationService.error('Error while get All Lines With Member Id');
                                console.error("'Error while get All Lines With Member Id'", err);
                            },
                            complete: () => {
                                this.rankingService.getAllRanks<Rank>().subscribe(ranks => {
                                    ranks.forEach(r => {
                                        console.log(r)
                                        if (r.minPoints <= this.credits && r.maxPoints >= this.credits) {
                                            console.log("condiction Rank:", r)
                                            this.rank = r;
                                            this.imagePreview = this.rank.badgeImage;
                                        }
                                    });
                                    this.loading = false;
                                })
                            }
                        }
                    );
                }
            }
        );
    }
}
