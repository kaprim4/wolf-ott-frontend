import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {EventService} from 'src/app/core/service/event.service';
import {EventType} from 'src/app/core/constants/events';
import {User} from 'src/app/core/models/auth.models';
import {NotificationItem} from '../models/notification.model';
import {ProfileOptionItem} from '../models/profileoption.model';
import {SearchResultItem, SearchUserItem} from '../models/search.model';
import {PageTitle} from '../models/page-title.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    notificationList: NotificationItem[] = [];
    profileOptions: ProfileOptionItem[] = [];
    searchResults: SearchResultItem[] = [];
    searchUsers: SearchUserItem[] = [];
    pageTitle: string = '';
    loggedInUser: User | null = null;
    topnavCollapsed: boolean = false;

    @Input() layoutType: string = 'vertical';
    @Input() containerClass?: string = '';

    // output events
    @Output() mobileMenuButtonClicked = new EventEmitter<void>();

    no_profile_img = './assets/images/logo.png';

    constructor(private authService: AuthenticationService, private eventService: EventService) {
        this.eventService.on(EventType.CHANGE_PAGE_TITLE).subscribe(({payload}) => {
            this.pageTitle = (payload as PageTitle).title;
        });
    }

    ngOnInit(): void {
        this._fetchSearchData();
        this._fetchNotifications();
        this._fetchProfileOptions();
        this.loggedInUser = this.authService.currentUser();
    }

    _fetchNotifications(): void {
        this.notificationList = [
            /*{
                id: 1,
                isActive: true,
                text: 'Cristina Pride',
                subText: 'Hi, How are you? What about our next meeting',
                avatar: 'assets/images/users/user-1.jpg',
            },
            {
                id: 2,
                text: 'Caleb Flakelar commented on Admin',
                subText: '1 min ago',
                icon: 'mdi mdi-comment-account-outline',
                bgColor: 'primary',
            },
            {
                id: 3,
                text: 'Karen Robinson',
                subText: 'Wow ! this admin looks good and awesome design',
                avatar: 'assets/images/users/user-4.jpg',
            },
            {
                id: 4,
                text: 'New user registered.',
                subText: '5 hours ago',
                icon: 'mdi mdi-account-plus',
                bgColor: 'warning',
            },
            {
                id: 5,
                text: 'Caleb Flakelar commented on Admin',
                subText: '1 min ago',
                icon: 'mdi mdi-comment-account-outline',
                bgColor: 'info',
            },
            {
                id: 6,
                text: 'Carlos Crouch liked Admin',
                subText: '13 days ago',
                icon: 'mdi mdi-heart',
                bgColor: 'secondary',
            },*/
        ];
    }

    _fetchProfileOptions(): void {
        this.profileOptions = [
            {
                label: 'Mon coumpte',
                icon: 'fe-user',
                redirectTo: '/apps/contacts/profile',
            },
            {
                label: 'Écran verrouillé',
                icon: 'fe-lock',
                redirectTo: '/auth/lock-screen',
            },
            {
                label: 'Se déconnecter',
                icon: 'fe-log-out',
                redirectTo: '/auth/logout',
            }
        ];
    }

    _fetchSearchData(): void {
        this.searchResults = [{
            id: 1,
            text: 'Analytics Report',
            icon: 'fe-home',
        },
            {
                id: 2,
                text: 'How can I help you?',
                icon: 'fe-aperture',
            },
            {
                id: 3,
                text: 'User profile settings',
                icon: 'fe-settings',
            }];

        this.searchUsers = [{
            id: 1,
            name: 'Erwin Brown',
            position: 'UI Designer',
            profile: 'assets/images/users/user-2.jpg'
        },
            {
                id: 2,
                name: 'Jacob Deo',
                position: 'Developer',
                profile: 'assets/images/users/user-5.jpg'
            }]

    }

    toggleRightSidebar() {
        this.eventService.broadcast(EventType.SHOW_RIGHT_SIDEBAR, true);
    }

    toggleMobileMenu(event: any) {

        this.topnavCollapsed = !this.topnavCollapsed;
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

}
