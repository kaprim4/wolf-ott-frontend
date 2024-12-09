import {Component, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserDetail} from "../../../../../shared/models/user";
import {UserService} from "../../../../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../../../../shared/services/token.service";
import {NotificationService} from "../../../../../shared/services/notification.service";
import {Rank} from "../../../../../shared/models/rank";
import {RankingService} from "../../../../../shared/services/ranking.service";
import {LineService} from "../../../../../shared/services/line.service";
import {LoggingService} from "../../../../../services/logging.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

    loggedInUser: any;
    userForm: UntypedFormGroup | any = {};
    rows: UntypedFormArray;
    user: UserDetail = {
        email: "",
        id: 0,
        ownerId: 0,
        resellerDns: "",
        thumbnail: "",
        timezone: "",
        username: "",
        apiKey: ""
    };
    userLoading: boolean;
    imagePreview: string | ArrayBuffer | null = null;
    registrationDate: any;
    credits: number;
    rank: Rank = {
        id: 0,
        title: '',
        maxPoints: 0,
        minPoints: 0,
        badgeImage: ''
    };
    badgePreview: string | ArrayBuffer | null = null;
    badgeLoading: boolean = true;

    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog,
        private tokenService: TokenService,
        private notificationService: NotificationService,
        private lineService: LineService,
        private rankingService: RankingService,
        private loggingService: LoggingService
    ) {
        this.initializeForm(this.user)
    }

    ngOnInit(): void {
        this.userLoading = true;
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe({
            next: (user) => {
                this.user = user;
                this.loggingService.log('userService.getUser :', this.user);
                this.registrationDate = user.dateRegistered
                this.initializeForm(user);
                this.userLoading = false;
                this.loggingService.log(this.user)
            },
            error: err => {
                this.notificationService.error('Error while get User');
            },
            complete : () => {
                this.badgeLoading = true;
                this.imagePreview = this.user.thumbnail != null ? this.user.thumbnail : null;
                this.lineService.getAllLinesWithMemberId(this.user.id).subscribe(
                    {
                        next: (count) => {
                            this.credits = count
                        },
                        error: (err) => {
                            this.notificationService.error('Error while get All Lines With Member Id');
                            this.loggingService.error("'Error while get All Lines With Member Id'", err);
                        },
                        complete: () => {
                            this.rankingService.getAllRanks<Rank>().subscribe(ranks => {
                                ranks.forEach(r => {
                                    //this.loggingService.log(r)
                                    if (r.minPoints <= this.credits && r.maxPoints >= this.credits) {
                                        this.loggingService.log("condiction Rank:", r)
                                        this.rank = r;
                                        this.badgePreview = this.rank.badgeImage;
                                    }
                                });
                                this.badgeLoading = false;
                            })
                        }
                    }
                );
            }
        });
    }

    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.user.thumbnail = reader.result as string; // Stocke l'image en base64
            };
            reader.readAsDataURL(file);
        }
    }

    initializeForm(user: UserDetail): void {
        this.userForm = this.fb.group({
            username: [user.username || '', Validators.required],
            email: [user.email || '', Validators.required], // Fix typo: eamil -> email
            timezone: [user.timezone || ''],
            //current_password: [''],
            //new_password: [''],
            //confirm_password: [''],
            resellerDns: [user.resellerDns || ''],
            apiKey: [user.apiKey || ''],
            rows: this.fb.array([]) // Initialize rows here
        });
    }

    saveDetail(): void {
        this.loggingService.log("saveDetail clicked")
        /*if(this.fb.control("current_password").value !== ""){

        }*/
        this.userService.updateUser(this.user).subscribe({
            next: value => {
                this.router.navigate(['/apps/users/profile']);
            },
            error: err => {
                this.notificationService.error("An error has occurred", err);
            },
            complete: () => {
                this.notificationService.success("Profile updated successfully.");
            }
        });
    }

    get loading(): boolean {
        return this.userLoading;
    }
}
