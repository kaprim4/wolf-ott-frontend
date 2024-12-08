import {
    Component,
    Output,
    EventEmitter,
    Input,
    ViewEncapsulation, OnInit,
    OnDestroy,
} from '@angular/core';
import {CoreService} from 'src/app/services/core.service';
import {MatDialog} from '@angular/material/dialog';
import {navItems} from '../sidebar/sidebar-data';
import {TranslateService} from '@ngx-translate/core';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MaterialModule} from 'src/app/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AuthenticationService} from "../../../../shared/services/auth.service";
import {TokenService} from "../../../../shared/services/token.service";
import {UserService} from "../../../../shared/services/user.service";
import {UserDetail} from "../../../../shared/models/user";
import { AppsService } from 'src/app/shared/services/apps.service';
import { Apps } from 'src/app/shared/models/apps';
import { map, share, Subscription, timer } from 'rxjs';

interface notifications {
    id: number;
    img: string;
    title: string;
    subtitle: string;
}

interface profiledd {
    id: number;
    img: string;
    title: string;
    subtitle: string;
    link: string;
    color: string;
}

interface apps {
    id: number;
    img: string;
    title: string;
    subtitle: string;
    link: string;
}

interface quicklinks {
    id: number;
    title: string;
    link: string;
}

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        NgScrollbarModule,
        TablerIconsModule,
        MaterialModule,
        FormsModule,
        MatMenuModule,
        MatSidenavModule,
        MatButtonModule,
    ],
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
    searchText: string = '';
    navItems = navItems;

    navItemsData = navItems.filter((navitem) => navitem.displayName);

    @Input() showToggle = true;
    @Input() toggleChecked = false;
    @Output() toggleMobileNav = new EventEmitter<void>();
    @Output() toggleMobileFilterNav = new EventEmitter<void>();
    @Output() toggleCollapsed = new EventEmitter<void>();

    showFiller = false;

    public selectedLanguage: any = {
        language: 'English',
        code: 'en',
        type: 'US',
        icon: '/assets/images/flag/icon-flag-en.svg',
    };

    no_profile_img = './assets/images/no_image.png';
    pageTitle: string = '';
    loggedInUser: any;
    user: UserDetail = {
        id: 0, username: ""
    };

    applications: Apps[];

    public languages: any[] = [
        {
            language: 'English',
            code: 'en',
            type: 'US',
            icon: '/assets/images/flag/icon-flag-en.svg',
        },
        {
            language: 'Español',
            code: 'es',
            icon: '/assets/images/flag/icon-flag-es.svg',
        },
        {
            language: 'Français',
            code: 'fr',
            icon: '/assets/images/flag/icon-flag-fr.svg',
        },
        {
            language: 'German',
            code: 'de',
            icon: '/assets/images/flag/icon-flag-de.svg',
        },
    ];

    constructor(
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private vsidenav: CoreService,
        public dialog: MatDialog,
        private translate: TranslateService,
        private userService: UserService,
        private appsService: AppsService
    ) {
        translate.setDefaultLang('en');
    }

    openDialog() {
        const dialogRef = this.dialog.open(AppSearchDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    changeLanguage(lang: any): void {
        this.translate.use(lang.code);
        this.selectedLanguage = lang;
    }

    datetime: Date = new Date();
    $clock:Subscription;

    ngOnInit(): void {
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });

        this.appsService.getAllApps().subscribe(apps => {
            this.applications = apps;
        });

        this.$clock = timer(0, 1000).pipe(map(() => new Date()), share())
                                    .subscribe(datetime => { this.datetime = datetime; });
    }

    ngOnDestroy(): void {
        if(this.$clock) this.$clock.unsubscribe();
    }

    notifications: notifications[] = [
        {
            id: 1,
            img: '/assets/images/profile/user-1.jpg',
            title: 'Roman Joined the Team!',
            subtitle: 'Congratulate him',
        },
        {
            id: 2,
            img: '/assets/images/profile/user-2.jpg',
            title: 'New message received',
            subtitle: 'Salma sent you new message',
        },
        {
            id: 3,
            img: '/assets/images/profile/user-3.jpg',
            title: 'New Payment received',
            subtitle: 'Check your earnings',
        },
        {
            id: 4,
            img: '/assets/images/profile/user-4.jpg',
            title: 'Jolly completed tasks',
            subtitle: 'Assign her new tasks',
        },
        {
            id: 5,
            img: '/assets/images/profile/user-5.jpg',
            title: 'Roman Joined the Team!',
            subtitle: 'Congratulate him',
        },
    ];
    profiledd: profiledd[] = [
        {
            id: 1,
            img: 'wallet',
            color: 'primary',
            title: 'My Profile',
            subtitle: 'Account Settings',
            link: '/apps/users/profile',
        },
        /*{
            id: 2,
            img: 'shield',
            color: 'success',
            title: 'My Inbox',
            subtitle: 'Messages & Email',
            link: '/',
        },
        {
            id: 3,
            img: 'credit-card',
            color: 'error',
            title: 'My Tasks',
            subtitle: 'To-do and Daily Tasks',
            link: '/',
        },*/
    ];
    apps: apps[] = [
        {
            id: 1,
            img: '/assets/images/svgs/icon-dd-chat.svg',
            title: 'Chat Application',
            subtitle: 'Messages & Emails',
            link: '/apps/chat',
        },
        {
            id: 2,
            img: '/assets/images/svgs/icon-dd-cart.svg',
            title: 'Todo App',
            subtitle: 'Completed task',
            link: '/apps/todo',
        },
        {
            id: 3,
            img: '/assets/images/svgs/icon-dd-invoice.svg',
            title: 'Invoice App',
            subtitle: 'Get latest invoice',
            link: '/apps/invoice',
        },
        {
            id: 4,
            img: '/assets/images/svgs/icon-dd-date.svg',
            title: 'Calendar App',
            subtitle: 'Get Dates',
            link: '/apps/calendar',
        },
        {
            id: 5,
            img: '/assets/images/svgs/icon-dd-mobile.svg',
            title: 'Contact Application',
            subtitle: '2 Unsaved Contacts',
            link: '/apps/contacts',
        },
        {
            id: 6,
            img: '/assets/images/svgs/icon-dd-lifebuoy.svg',
            title: 'Tickets App',
            subtitle: 'Create new ticket',
            link: '/apps/tickets',
        },
        {
            id: 7,
            img: '/assets/images/svgs/icon-dd-message-box.svg',
            title: 'Email App',
            subtitle: 'Get new emails',
            link: '/apps/email/inbox',
        },
        {
            id: 8,
            img: '/assets/images/svgs/icon-dd-application.svg',
            title: 'Courses',
            subtitle: 'Create new course',
            link: '/apps/courses',
        },
    ];
    quicklinks: quicklinks[] = [
        {
            id: 1,
            title: 'Pricing Page',
            link: '/theme-pages/pricing',
        },
        {
            id: 2,
            title: 'Authentication Design',
            link: '/authentication/login',
        },
        {
            id: 3,
            title: 'Register Now',
            link: '/authentication/side-register',
        },
        {
            id: 4,
            title: '404 Error Page',
            link: '/authentication/error',
        },
        {
            id: 5,
            title: 'Notes App',
            link: '/apps/notes',
        },
        {
            id: 6,
            title: 'Employee App',
            link: '/apps/employee',
        },
        {
            id: 7,
            title: 'Todo Application',
            link: '/apps/todo',
        },
        {
            id: 8,
            title: 'Treeview',
            link: '/theme-pages/treeview',
        },
    ];
}

@Component({
    selector: 'search-dialog',
    standalone: true,
    imports: [
        RouterModule,
        MaterialModule,
        TablerIconsModule,
        FormsModule,
        NgScrollbarModule,
    ],
    templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
    searchText: string = '';
    navItems = navItems;

    navItemsData = navItems.filter((navitem) => navitem.displayName);

    
}