import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// service
import {AuthenticationService} from 'src/app/core/service/auth.service';
import {EventService} from 'src/app/core/service/event.service';

// constant
import {EventType} from 'src/app/core/constants/events';

// types
import {User} from 'src/app/core/models/auth.models';
import {NotificationItem} from '../models/notification.model';
import {ProfileOptionItem} from '../models/profileoption.model';
import {SearchResultItem, SearchUserItem} from '../models/search.model';

// data
import {NOTIFICATIONS, PROFILEOPTIONS} from './data';
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

    constructor(
        private authService: AuthenticationService,
        private eventService: EventService
    ) {
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

    /**
     * Fetches notifications
     */
    _fetchNotifications(): void {
        this.notificationList = NOTIFICATIONS;
    }

    /**
     * Fetches profile options
     */
    _fetchProfileOptions(): void {
        this.profileOptions = PROFILEOPTIONS;
    }


    /**
     * Fetches search results
     */
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

    /**
     * Toggles the right sidebar
     */
    toggleRightSidebar() {
        this.eventService.broadcast(EventType.SHOW_RIGHT_SIDEBAR, true);
    }

    /**
     * Toggle the menu bar when having mobile screen
     */
    toggleMobileMenu(event: any) {

        this.topnavCollapsed = !this.topnavCollapsed;
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

}
